const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
const {users} = require('../models/userModel');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');


//9

/**
 * @api {post} /users/login Login a user
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} x-auth-token JWT token for authentication.
 * @apiSuccess {Object} user User information.
 * @apiSuccess {String} user._id User's ID.
 * @apiSuccess {String} user.name User's name.
 * @apiSuccess {String} user.email User's email.
 *
 * @apiError {String} 400 Invalid email or password.
 */
router.post('/authoriseer', async (req, res) => {


    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await users.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email');

    console.log(user.email);

    console.log(user.password);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password.');

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

function validate(req){
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
}


module.exports = router;