const assert = require('assert'),
    express = require('express'),
    router = express.Router(),
    getBookPosts = require('../models/getBookPosts'),
    getPostDetails = require('../models/getPostDetails');

/* GET viewPosts */
router.get('/', (req, res) => {
    let query = req.query.q;
    getBookPosts(query, (err, data) => {
        assert.equal(null, err);
        res.render('viewPosts', {title: 'View Posts', session: req.session, books: data});
    });
});

/* GET viewPosts/<postId> */
router.get('/:postId', (req, res) => {
    let postId = req.params.postId;
    getPostDetails(postId, (err, data) => {
        assert.equal(null, err);
        if(data) {
            res.json(data);
        }
    })
});

module.exports = router;