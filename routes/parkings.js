const express = require('express');
const router = express.Router();
const parking = require('../models/parkingModel');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Joi = require('joi');

router.use(express.json());
router.use(express.urlencoded({extended: true}));




async function updateParking(id, name, stad, plaatsen){
    try{
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
    } catch(err){
        console.error(err);
    }
    
}

async function deleteParking(id){
    try{
        const result = await parking.findByIdAndDelete(id);
        console.log(result);
    } catch(err){
        console.error(err);
    }
    
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
    try{
        const error = validate(req.body);
        if(error.error){
            return res.status(400).json({error: result.error.details[0].message});
        }
    
        const findByName = await parking.findOne({name: req.body.name, stad: req.body.stad});
    
        if(findByName){
            return res.status(400).json({error: 'Parking already exists'});
        }
        const parkeer = new parking({
            name: req.body.name,
            stad: req.body.stad,
            plaatsen: req.body.plaatsen
        })


        const result = await parkeer.save();
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//4
router.put('/:id', async (req, res) => {
    try{
    
        const error = validate(req.body);
        if(error.error){
            return res.status(400).json({error: result.error.details[0].message});
        }

        const result = await updateParking(req.params.id, req.body.name, req.body.stad, req.body.plaatsen); 
        res.send(result);
    } catch (err){
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
router.get('/getAllParkingsByStad/:stadId', async (req, res) => {
    try{
        const result = await parking.find({stad: req.params.stadId});
        res.send(result);
    } catch (err){
        res.status(500).json({error: err.message});
    }
})

async function validate(req){
    const schema = Joi.object({
        name: Joi.string().required(),
        stad: Joi.string().required(),
        plaatsen: Joi.number().required()
    })
    return schema.validate(req);
}

module.exports = router;