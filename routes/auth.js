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
router.post('/', async (req, res) => {


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