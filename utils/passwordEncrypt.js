const crypto = require('crypto');

const encrypt = (passwordText) => {
    let salt = crypto.randomBytes(128).toString('base64');
    let iterations = 500 + Math.floor(Math.random() * 500);
    let hash = crypto.pbkdf2Sync(passwordText, salt, iterations, 512, 'sha512');
    return { salt, iterations, hash };
};

const verify = (passwordAttempt, salt, iterations) => {
    return crypto.pbkdf2Sync(passwordAttempt, salt, iterations, 512, 'sha512');
};

module.exports = { encrypt, verify };