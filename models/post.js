const MongoClient = require('mongodb').MongoClient;

const dbUrl = require('../config').dbUrl;

const post = function (isbn, name, author, publication, city, condition, details, userID) {

    this.isbn = isbn;
    this.name = name;
    this.author = author;
    this.publication = publication;
    this.city = city;
    this.condition = condition;
    this.details = details;
    this.userID = userID;

    this.validate = () => {
        //TODO: Validation
        return true;
    };

    let self = this;

    this.addToDatabase = (cb) => {
        if (this.validate()) {
            MongoClient.connect(dbUrl)
                .then(db => db.collection('posts').insertOne({
                    isbn: self.isbn,
                    name: self.name,
                    author: self.author,
                    publication: self.publication,
                    city: self.city,
                    condition: self.condition,
                    details: self.details,
                    userID: self.userID
                }))
                .then(() => cb(null))
                .catch(err => cb(err));
        }
        else {
            return cb(new Error('Invalid data'))
        }
    };

};

module.exports = post;