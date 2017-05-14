const express = require('express'),
    router = express.Router();

/* GET post page. */
router.get('/', (req, res, next) => {
    res.render('post', {title: "Post a book", session: req.session});
});

module.exports = router;