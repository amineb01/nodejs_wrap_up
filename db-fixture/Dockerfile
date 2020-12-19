FROM mongo

COPY fixture.json /fixture.json
CMD mongoimport --host mongo --db sopptas --collection users --type json --file /fixture.json --jsonArray
