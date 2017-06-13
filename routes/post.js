const assert = require('assert'),
    express = require('express'),
    router = express.Router(),
    bookPost = require('../models/post');

/* GET post page. */
router.get('/', (req, res) => {
    res.render('post', {title: "Post a book", session: req.session});
});

/* POST book post */
router.post('/', (req, res) => {
    let {isbn, name, author, publication, city, condition, details} = req.body;
    let post = new bookPost(isbn, name, author, publication, city, condition, details, req.session.data._id);
    post.addToDatabase(err => {
        assert.equal(null, err);
        res.render('postSuccess', {title: 'Post a book', session: req.session});
    });
});

module.exports = router;