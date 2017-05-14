const assert = require('assert'),
    MongoClient = require('mongodb').MongoClient,
    passwordEncrypt = require('../utils/passwordEncrypt');

const dbUrl = 'mongodb://localhost/booksharing';

const user = function (name, email, password, address, contact, city, pincode) {
    this.name = name;
    this.email = email;
    this.password = passwordEncrypt.encrypt(password);
    this.address = address;
    this.contact = contact;
    this.city = city;
    this.pincode = pincode;

    this.validate = function () {
        //TODO: Validation
        return true;
    };

    let self = this;

    this.addToDatabase = (cb) => {
        if (self.validate()) {
            MongoClient.connect(dbUrl, (err, db) => {
                if (err) {
                    cb(err);
                }
                else {
                    db.collection('user').insertOne({
                        name: self.name,
                        email: self.email,
                        password: self.password,
                        address: self.address,
                        contact: self.contact,
                        city: self.city,
                        pincode: self.pincode
                    }, function (err, result) {
                        if (err) {
                            cb(err);
                        }
                        else {
                            cb(null);
                        }
                    });
                }
            });
        }
        else {
            cb(new Error("Invalid data."));
        }
    };

};

module.exports = user;