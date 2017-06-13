const MongoClient = require('mongodb').MongoClient;

const dbUrl = require('../config').dbUrl;

const getBookPosts = function (query, cb) {
    let dbQuery = query
        ? {'$text': {'$search': query, '$caseSensitive': false}}
        : {};
    MongoClient.connect(dbUrl)
        .then(db => db.collection('posts').find(dbQuery))
        .then(result => result.toArray())
        .then(data => cb(null, data))
        .catch(err => cb(err));
};

module.exports = getBookPosts;