var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: process.env.ES_HOST + ':9200',
    log: 'trace'
  });

  exports.QuerybyGeoBounds = async function(boundsCoordinates, maxResults)
  {
    var hitsize = (maxResults > 200) ? 200: maxResults;
    var response = await client.search({
        index: 'dos_services',
        type: '_doc',
        body: {
            query: {
                bool : {
                    must : {
                        match_all : {}
                    },
                    filter : {
                        geo_polygon : {
                            location : {
                                "points" : boundsCoordinates
                            }
                        }
                    }
                }
            },
            size: hitsize
        }
      })
      
      return response.hits;
  }