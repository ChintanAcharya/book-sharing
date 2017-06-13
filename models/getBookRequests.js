const MongoClient = require('mongodb').MongoClient;

const dbUrl = require('../config').dbUrl;

const getBookRequests = function (query, cb) {
    let dbQuery = query
        ? {'$text': {'$search': query, '$caseSensitive': false}}
        : {};
    MongoClient.connect(dbUrl)
        .then(db => db.collection('requests').find(dbQuery))
        .then(result => result.toArray())
        .then(data => cb(null, data))
        .catch(err => cb(err));
};

module.exports = getBookRequests;