const users = require('../models/userModel');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.use(express.json());
router.use(express.urlencoded({extended: true}));


//7
router.post('/register', async (req, res) => {
    try{
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(3).required()
        })
        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await users.findOne({email: req.body.email});
        if(user) return res.status(400).send('User already exists');


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        gebruiker = new users({
            name: req.body.name,
            email: req.body.email,
            password:  hashedPassword
        })

        try{
            await gebruiker.save();
            const token = gebruiker.generateAuthToken();
            res.header('x-auth-token', token).send(_.pick(users, ['_id', 'name', 'email']));
        } catch(err){
            res.status(500).send(err.message);
        }
        
        
    } catch(err){
        return res.status(500).send(err.message);
    }
})


module.exports = router;