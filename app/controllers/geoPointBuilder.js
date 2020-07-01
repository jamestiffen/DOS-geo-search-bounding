const request = require('request');
const config = require('../config/config.json');

exports.getCoordinates= async function(postcode) {
    return await getData(postcode).then(function(data) {
        return data;
    });
  };

  var getData = function(postcode) {

    return new Promise(function(resolve, reject){
      request.get({
       url: "https://api.ideal-postcodes.co.uk/v1/postcodes/"+ postcode +"?api_key=" + config.idealPostcodesApiKey,
       json:true,
       gzip: true
     }
     , (error, response, body)  => {
       if (error) {
         console.error(error)
         reject(error);
       }
       else resolve(parseResponse(body));
     });
   });
 };

 var parseResponse = function(response)
 {
      var points=[];
      if(response.result && response.result.length >0)
      {
         
         points = { "lon": response.result[0].longitude, "lat": response.result[0].latitude };
      }

      return points;
 };