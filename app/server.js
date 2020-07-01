var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var handelbars = require("express-handlebars");
var app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", handelbars({defaultLayout: 'main', extname: '.hbs', partialsDir: [
    'views/partials/'
]}));
app.set('view engine', 'hbs');
routes(app);

var server = app.listen(process.env.PORT, function () {

    console.log("app running on port.", server.address().port);
});