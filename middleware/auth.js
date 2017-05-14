const session = require('express-session'),
    login = require('../models/login');

const auth = (req, res, next) => {
    const sess = req.session;
    const username = req.body.username;
    const password = req.body.password;
    if (sess.data) {
        next();
    }
    else if (username && password) {
        //TODO: redirect to login
    }
    else {
        res.redirect('/login');
    }
};

module.exports = auth;