#!/usr/bin/env bash

until $(curl --output /dev/null --silent --head --fail http://elasticsearch:9200); do
    printf '.'
    sleep 5
done

curl -X PUT http://elasticsearch:9200/dos_services -H "Content-Type: application/json"  -d "{}"

curl -X PUT http://elasticsearch:9200/dos_services/_mapping/_doc -H "Content-Type: application/json" -d "{\"properties\": {\"name\":{\"type\":\"text\"},\"location\": {\"type\": \"geo_point\"},\"type\":{\"type\":\"text\"}}}"

curl -X POST http://elasticsearch:9200/dos_services/_doc/_bulk -H "Content-Type: application/json" --data-binary "@/pathwayesdata.json"
