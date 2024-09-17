// const jwt = require("jsonwebtoken");
// const User = require("../Models/userModel.js");
// const asyncHandler = require("express-async-handler");

// const JWT_SECRET = 'akshada';

// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             console.log(JWT_SECRET);

//             //decodes token id
//             const decoded = jwt.verify(token, JWT_SECRET);

//             req.user = await User.findById(decoded.id).select("-password");

//             next();
//         } catch (error) {
//             res.status(401);
//             throw new Error("Not authorized, token failed");
//         }
//     }

//     if (!token) {
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// });

// module.exports = { protect };















// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// // const User = require('../models/userModel');
// const User = require("../Models/userModel.js");


// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.user = await User.findById(decoded.id).select('-password');

//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401);
//             throw new Error('Not authorized, token failed');
//         }
//     }

//     if (!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token');
//     }
// });

// module.exports = { protect };












const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const JWT_SECRET = 'akshada';  // Replace with your actual secret key

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decode token id
            const decoded = jwt.verify(token, JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
