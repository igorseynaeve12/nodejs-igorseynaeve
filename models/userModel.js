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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'), {expiresIn: '1h'});
    return token;
}


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}

const User = mongoose.model('User', UserSchema);


exports.users = User;
exports.validate = validateUser;