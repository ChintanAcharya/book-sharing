const MongoClient = require('mongodb').MongoClient;

const dbUrl = require('../config').dbUrl;

const request = function (isbn, name, author, publication, city, details, userId) {

    this.isbn = isbn;
    this.name = name;
    this.author = author;
    this.publication = publication;
    this.city = city;
    this.details = details;

    this.validate = () => {
        //TODO: Add validation
        return true;
    };

    let self = this;

    this.addToDatabase = (cb) => {
        if (this.validate()) {
            MongoClient.connect(dbUrl)
                .then(db => db.collection('requests').insertOne({
                    isbn: self.isbn,
                    name: self.name,
                    author: self.author,
                    publication: self.publication,
                    city: self.city,
                    details: self.details,
                    userID: userId
                }))
                .then(() => cb(null))
                .catch(err => cb(err));
        }
        else {
            return cb(new Error('Invalid data'));
        }
    }

};

module.exports = request;