const mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    ObjectId = mongodb.ObjectId;

const dbUrl = require('../config').dbUrl;

const getRequestDetails = (id, cb) => {
    MongoClient.connect(dbUrl)
        .then(db => db.collection('requests').findOne({'_id': ObjectId(id)}))
        .then(doc => cb(null, doc))
        .catch(err => cb(err))
};

module.exports = getRequestDetails;