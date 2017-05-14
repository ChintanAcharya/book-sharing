const express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: "Online Book Sharing Platform", session: req.session});
});

module.exports = router;
