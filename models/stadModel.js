const mongoose = require('mongoose');
const joi = require('joi');
const config = require('config');



const stadSchema = new mongoose.Schema({
    id: Number,
    name: String,
    postcode: Number,
})


module.exports = mongoose.model('stad', stadSchema);