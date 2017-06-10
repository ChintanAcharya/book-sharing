const assert = require('assert'),
    express = require('express'),
    request = require('../models/request'),
    router = express.Router();

/* GET request page. */
router.get('/', (req, res) => {
    res.render('request', {title: "Request a book", session: req.session});
});

router.post('/', (req, res) => {
    let {isbn, name, author, publication, city, details} = req.body;
    let bookRequest = new request(isbn, name, author, publication, city, details, req.session.data._id);
    bookRequest.addToDatabase((err) => {
        assert.equal(null, err);
        //TODO: successful request page
        res.render('requestSuccess', {title: 'Registration', session: req.session});
    });
});

module.exports = router;