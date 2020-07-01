FROM curlimages/curl:7.71.0

# Install packages

#COPY docker-entrypoint.sh /
USER root
RUN apk --update add bash && \
    apk add dos2unix

COPY buildIndex.sh /
COPY pathwayesdata.json /
RUN apk update && apk add bash
RUN dos2unix /buildIndex.sh

ENTRYPOINT  [ "/buildIndex.sh"] 