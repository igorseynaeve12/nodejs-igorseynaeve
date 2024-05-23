const {required } = require('joi'); 
const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    id: Number,
    name: String,
    stad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stad'
    },
    plaatsen: Number
})

module.exports = mongoose.model('parking', parkingSchema);