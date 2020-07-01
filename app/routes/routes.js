var polygonBuilder = require("../controllers/polygonbuilder.js");
var elasticseaerchQueryBuilder = require("../controllers/elasticseaerchQueryBuilder.js");
var geoPointBuilder = require("../controllers/geoPointBuilder.js");

var appRouter = function (app) {
    app.get("/", function(req, res) {
        res.render('index')
    });

    app.get("/geopoints/getPoints/:postcode", async function(req, res) {
        var source = await geoPointBuilder.getCoordinates(req.params.postcode);
        res.status(200).send(JSON.stringify(source));
    });

    app.get("/polygon/getBounds/distance/:sourceLocation/:traveltype/:range", async function(req, res) {

        res.status(200).send(JSON.stringify(await polygonBuilder.getBounds(req.params.range, req.params.traveltype, "distance", req.params.sourceLocation)));
      });



    app.get("/polygon/getBounds/time/:sourceLocation/:traveltype/:time", async function(req, res) {

      res.status(200).send(JSON.stringify(await polygonBuilder.getBounds(req.params.time, req.params.traveltype, "time",req.params.sourceLocation)));
    });

    app.post("/querydos/:maxResults", async function(req, res) {
        
        res.status(200).send(JSON.stringify(await elasticseaerchQueryBuilder.QuerybyGeoBounds(req.body, req.params.maxResults)));
    });

    app.use((err, req, res, _next) => {
        // Expected errors always throw ServerError.
        // Unexpected errors will either throw unexpected stuff or crash the application.
        if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {
          return res.status(err.status || 500).json({ error: err.message });
        }
      
        log.error('~~~ Unexpected error exception start ~~~');
        log.error(req);
        log.error(err);
        log.error('~~~ Unexpected error exception end ~~~');

        return res.status(500).json({ error: '' });
      });
  }
  
  module.exports = appRouter;