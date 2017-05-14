const express = require('express'),
    router = express.Router();

/* GET request page. */
router.get('/', (req, res, next) => {
    res.render('request', { title: "Request a book", session: req.session });
});

module.exports = router;