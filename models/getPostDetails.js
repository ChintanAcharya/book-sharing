const mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    ObjectId = mongodb.ObjectId;

const dbUrl = require('../config').dbUrl;

const getPostDetails = (id, cb) => {
    MongoClient.connect(dbUrl)
        .then(db => db.collection('posts').findOne({'_id': ObjectId(id)}))
        .then(doc => cb(null, doc))
        .catch(err => cb(err))
};

module.exports = getPostDetails;