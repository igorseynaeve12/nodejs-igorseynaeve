const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        unique: true,
        lowercase: true,
    }
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

module.exports = mongoose.model('User', UserSchema);