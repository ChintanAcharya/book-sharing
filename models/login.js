const MongoClient = require('mongodb').MongoClient,
    passwordEncrypt = require('../utils/passwordEncrypt');

const dbStr = 'mongodb://localhost/booksharing';

const login = (user, pass, cb) => {
    MongoClient.connect(dbStr, (err, db) => {
        db.collection('user').findOne({ email: user }, (err, doc) => {
            if (err)
                cb(err);
            else if (doc === null)
                cb(null, null);
            else {
                let storedPass = doc.password;
                let result = passwordEncrypt.verify(pass, storedPass.salt, storedPass.iterations).toString() === storedPass.hash.toString();
                if (result) {
                    cb(null, doc)
                }
                else {
                    cb(null, null);
                }
            }
        });
    });
};

module.exports = login;