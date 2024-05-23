const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.use(express.json());
router.use(express.urlencoded({extended: true}));


//10
router.get('/', async (req, res) => {
    res.status(200).json({message: 'Welkom op deze Api-pagina van Igor Seynaeve'});
})


module.exports = router;