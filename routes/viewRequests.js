const assert = require('assert'),
    express = require('express'),
    router = express.Router(),
    getBookRequests = require('../models/getBookRequests'),
    getRequestDetails = require('../models/getRequestDetails');

/* GET viewRequests */
router.get('/', (req, res) => {
    let query = req.query.q;
    getBookRequests(query, (err, data) => {
        assert.equal(null, err);
        res.render('viewRequests', {title: 'View Requests', session: req.session, books: data});
    });
});

/* GET viewRequests/<requestId> */
router.get('/:requestId', (req, res) => {
    let requestId = req.params.requestId;
    getRequestDetails(requestId, (err, data) => {
        assert.equal(null, err);
        if(data) {
            res.json(data);
        }
    })
});

module.exports = router;