const MongoClient = require('mongodb').MongoClient,
    passwordEncrypt = require('../utils/passwordEncrypt');

const dbUrl = require('../config').dbUrl;

const login = (user, pass, cb) => {
    MongoClient.connect(dbUrl)
        .then((db) => db.collection('user').findOne({email: user}))
        .then((doc) => {
            if (doc === null)
                return cb(null, null);
            else {
                let storedPass = doc.password;
                let result = passwordEncrypt.verify(pass, storedPass.salt, storedPass.iterations).toString() === storedPass.hash.toString();
                return result ? cb(null, doc) : cb(null, null);
            }
        })
        .catch((err) => cb(err));
};

module.exports = login;