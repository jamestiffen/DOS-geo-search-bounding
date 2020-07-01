# DOS-geo-search-bounding
App demonstrating the use of Isocrones api to create polygon search bounds for DOS service lookups

## Installation

### Configuration
Set up api keys in `app/config/config.json
```json
    {
        "targomoApiKey": "1234",
        "idealPostcodesApiKey": "1234" 
    }
```
* Get a `targomoApiKey` from here https://targomo.com/developers/ 
* Get a `idealPostcodesApiKey` from here https://ideal-postcodes.co.uk/users/sign_up

Set up Mapbox access token in `app/view/index.hbs`

```javascipt
    window.CONFIG = {
        MAPBOX_API_ACESS_TOKEN: 'testKey',
    }
```
*Get a MAPBOX_API_ACESS_TOKEN from here https://docs.mapbox.com/api/maps/

Get full DOS data set to populate elastic search and add to `elasticsearch-mapping-init/pathwayesdata.json`

### Install
```docker-compose
    docker-compose up
```