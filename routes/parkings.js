const express = require('express');
const router = express.Router();
const parking = require('../models/parkingModel');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Joi = require('joi');

router.use(express.json());
router.use(express.urlencoded({extended: true}));




async function updateParking(id, name, stad, plaatsen){
    const result = await parking.findByIdAndUpdate(
        {_id: id},
        {$set:{
            name: name,
            stad: stad,
            plaatsen: plaatsen
        }
    }
    )
    console.log(result);
}

async function deleteParking(id){
    const result = await parking.findByIdAndDelete(id);
    console.log(result);
}




async function getParkings() {
    try{
        const parkings = await parking.find({});
        return {parkings};
    } catch(err){
        console.error(err);
        return {error: err.message};
    }
}


//1
router.get('/', async (req, res) => {
    try{
        res.status(200).json((await getParkings()).parkings);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

//2
router.get('/:id', async (req, res) => {
    try{
        const parkings = (await getParkings()).parkings;



        const parkingById = parkings.find(parking => parking._id.toString() === req.params.id);

        if(!parkingById) return res.status(404).json({error: 'Parking not found'});

        res.send(parkingById);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

//3
router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        stad: Joi.string().required(),
        plaatsen: Joi.number().required()
    })


    const result = schema.validate(req.body);
    if(result.error){
        return res.status(400).json({error: result.error.details[0].message});
    }

    const findByName = await parking.findOne({name: req.body.name});

    if(findByName){
        return res.status(400).json({error: 'Parking already exists'});
    }

    const parkeer = new parking({
        name: req.body.name,
        stad: req.body.stad,
        plaatsen: req.body.plaatsen
    })

    try{
        const result = await parkeer.save();
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//4
router.put('/:id', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        stad: Joi.string().required(),
        plaatsen: Joi.number().required()
    })

    const parkeerplaats = await parking.findById(req.params.id);

    const result = schema.validate(req.body);

    if(result.error){
        return res.status(400).json({error: result.error.details[0].message});
    }

    parkeerplaats.name = req.body.name;
    parkeerplaats.stad = req.body.stad;
    parkeerplaats.plaatsen = req.body.plaatsen;

    try{
        const result = await parkeerplaats.save();
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

//5
router.delete('/:id', async (req, res) => {
    try{
        const result = await deleteParking(req.params.id);
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

//6
router.get('/stad/:stad', async (req, res) => {
    try{
        const parkings = (await getParkings()).parkings;

        const parkingByStad = parkings.filter(parking => parking.stad === req.params.stad); 
        
        if(!parkingByStad) return res.status(404).json({error: "Parkings not found"});

        console.log(parkingByStad);
        res.send(parkingByStad.entries);

    } catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;