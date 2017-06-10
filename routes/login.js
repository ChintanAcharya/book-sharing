const assert = require('assert'),
    express = require('express'),
    login = require('../models/login'),
    router = express.Router();

/* GET login page. */
router.get('/', (req, res) => {
    res.render('login', {title: "Login", session: req.session});
});

/* POST login */
router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    login(username, password, (err, result) => {
        assert.equal(null, err);
        if (result) {
            //TODO: FIX ME
            req.session.data = result;
            res.redirect('/');
        }
        else {
            res.render('login', {title: 'Login', message: 'Username or password incorrect', session: req.session});
        }
    });
});

module.exports = router;