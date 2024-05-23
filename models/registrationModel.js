const joi = require('joi');
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    id: Number,
    nummerplaat: String,
    parking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking'
    },
    datum: Date 
})

const Registration = mongoose.model('registration', registrationSchema);

exports.Registration = Registration;