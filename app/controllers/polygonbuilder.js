
const request = require('request');
const config = require('../config/config.json');

var data = {
  "sources": [
    {
      "id": "1",
      "lat": 50.93359,
      "lng": -1.308772,
      "tm": {
     
      }
    }
  ],
  "edgeWeight": "time",
  "polygon": {
    "values": [
      100
    ],
    "intersectionMode": "union",
    "serializer": "geojson",
    "srid" : 4326
  }
}


  exports.getBounds = async function(range, travelType, searchType, sourcelocation) {
    var sourceCoords = JSON.parse(sourcelocation)
    return await getData(range, travelType, searchType, sourceCoords).then(function(data) {
        return data;
    });
  };

  var getData = function(range, travelType, searchType, sourceCoords) {
    var traveljson = '{"' + travelType +'":{}}';
    data.sources[0].tm = JSON.parse(traveljson);
    data.sources[0].lat = sourceCoords.lat;
    data.sources[0].lng = sourceCoords.lon;
    data.edgeWeight = searchType;
    data.polygon.values = [range];
    return new Promise(function(resolve, reject){
      request.post({
       url: 'https://api.targomo.com/britishisles/v1/polygon?key=' + config.targomoApiKey,
       body: data,
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
      if(response.data)
      {
      
         response.data.features[0].geometry.coordinates[0][0].map((val) => {
            points.push({ "lon": val[0], "lat": val[1] });
        })
        return points;
      }
 };