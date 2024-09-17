require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
// dotenv.config();


// const JWT_SECRET = process.env.JWT_SECRET; // Use the secret key from environment variables

const generateToken = (id) => {
    const JWT_SECRET = "akshada";
    console.log(JWT_SECRET);
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '90d',
    });
};

module.exports = generateToken;
