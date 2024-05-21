const {required } = require('joi'); 
const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    id: Number,
    name: String,
    stad: String,
    plaatsen: Number
})

module.exports = mongoose.model('parking', parkingSchema);