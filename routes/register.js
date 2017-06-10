const assert = require('assert'),
    express = require('express'),
    user = require('../models/user'),
    router = express.Router();

/* GET register page. */
router.get('/', (req, res) => {
    res.render('register', {title: "Register", session: req.session});
});

/* POST register form */
router.post('/', (req, res) => {
    let {name, email, password, address, contact, city, pincode} = req.body;
    let newUser = new user(name, email, password, address, contact, city, pincode);
    newUser.addToDatabase(function (err) {
        if (err) {
            res.render('error', {message: "Internal Server Error", error: {status: "500"}});
        }
        res.render('registerSuccess', {title: 'Registration'});
    });
});

module.exports = router;