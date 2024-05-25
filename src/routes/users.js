const {users, validate} = require('../models/userModel');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.use(express.json());
router.use(express.urlencoded({extended: true}));


//7
router.post('/', async (req, res) => {


    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await users.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already exists');

    user = new users(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

    console.log(user.password);

    console.log(user.isAdmin)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    console.log(user.password);



    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
})
//8
router.get('/me', auth ,async (req, res) => {
    const user = await users.findById(req.user._id).select('-password');
    res.send(user);
})


module.exports = router;