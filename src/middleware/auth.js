const jwt = require('jsonwebtoken');
const config = require('config');
const dotenv = require('dotenv').config();


const jwtPrivateKey = process.env.privateKey

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decode = jwt.verify(token, jwtPrivateKey);
        req.user = decode;
        next();
    } catch(ex) {
        res.status(400).send('Invalid token.');
    }
}