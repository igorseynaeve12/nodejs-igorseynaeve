const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');



router.get('/', async (req, res) => {
    res.status(200).json({message: 'Hello World'});
})