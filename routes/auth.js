const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
const users = require('../models/userModel');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');


//8
router.post('/login', async (req, res) => {
    const result = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    })
    if (result.error) return res.status(400).send(result.error.details[0].message);


    users = await users.findOne({ email: req.body.email });

    if(users){
        return res.status(404).send('User already exists');
    }
    const validPassword = await bcrypt.compare(req.body.password, users.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    console.log(config.get('jwtPrivateKey'));

    const token = jwt.sign({_id: users._id}, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(users, ['_id', 'name', 'email']));

    res.send(true);
})


module.exports = router;