const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Registration} = require('../models/registrationModel');
const joi = require('joi');
const auth = require('../middleware/auth');

router.use(express.json());
router.use(express.urlencoded({extended: true}));


async function getRegistrations() {
    try{
        const registratie = await Registration.find({});
        return {registratie};
    } catch(err){
        console.error(err);
        return {error: err.message};
    }
}


async function deleteRegistrations(id){
    try{
        const result = await Registration.findByIdAndDelete(id);
        console.log(result);
    } catch(err){
        console.error(err);
        return {error: err.message};
    }
    
}

async function createRegistration(nummerplaat, parking){
    try{
        const registratie = new Registration({
            nummerplaat: nummerplaat,
            parking: parking,
            datum: Date.now()
        });
        return registratie;
    } catch(err){
        console.error(err);
        return {error: err.message};
    }
}

async function updateRegistration(id, nummerplaat, parking){
    try{
        const registratie = await Registration.findByIdAndUpdate(id, {
            nummerplaat: nummerplaat,
            parking: parking,
            datum: Date.now()
        });
    } catch(err){
        console.error(err);
        return {error: err.message};
    }
    
}

//15
router.post('/', auth ,async (req, res) => {
    

    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const findByNummerplaat = await Registration.findOne({nummerplaat: req.body.nummerplaat});

        if(findByNummerplaat){
            return res.status(400).json({error: 'Registration already exists'});
        }

        const registratie = await createRegistration(req.body.nummerplaat, req.body.parking);
        const result = await registratie.save();
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }


})

//16
router.get('/', async (req, res) => {
    try{
        res.status(200).json((await getRegistrations()).registratie);
    } catch (err){
        res.status(500).json({error: err.message});
    }
})


//17
router.delete('/:id', async (req, res) => {
    try{
        const result = await deleteRegistrations(req.params.id);
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

//18
router.put('/:id', auth,async (req, res) => {
    try{
        const result = await updateRegistration(req.params.id, req.body.nummerplaat, req.body.parking);
        res.send(result);
    } catch (err){
        res.status(500).json({error: err.message});
    }
})

router.get('/getRegistrationByParkingId/:parkingId', async (req, res) => {
    try{
        const result = await Registration.find({parking: req.params.parkingId});
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})


function validate(req){
    const schema = joi.object({
        nummerplaat: joi.string().required(),
        parking: joi.string().required(),
    })

    return schema.validate(req);
}




module.exports = router;