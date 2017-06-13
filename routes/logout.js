const assert = require('assert'),
    express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy(err => {
        assert.equal(null, err);
        res.redirect('/');
    });
});

module.exports = router;