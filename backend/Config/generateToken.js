const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key_here';  // Define your secret key directly in the file

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
