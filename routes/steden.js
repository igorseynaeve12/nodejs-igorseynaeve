const express = require('express');
const router = express.Router();
const steden = require('../models/stadModel');
const mongoose = require('mongoose');
const joi = require('joi');


router.use(express.json());
router.use(express.urlencoded({extended: true}));

async function deleteStad(id){
    const stad = await steden.findByIdAndDelete(id);
    return stad;
}

async function getSteden() {
    try{
        const stad = await steden.find();
        return {stad};
    } catch(err){
        console.log(err);
    }
}

//9
router.get('/steden', async (req, res) => {
    try{
        res.status(200).json((await getSteden()).stad);
    } catch(err){
        res.status(500).json(err);
    }
})


//10
router.post('/steden', async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        postcode: joi.number().required(),
    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const stad = new steden({
        name: req.body.name,
        postcode: req.body.postcode,
    })

    try{
        await stad.save();
        res.status(200).json(stad);
    } catch(err){
        res.status(500).json(err);
    }



})

//11
router.get('/steden/:id', async (req, res) => {
    try{
        const stad = await steden.findById(req.params.id);
        res.status(200).json(stad);
    } catch(err){
        res.status(500).json(err);
    }
})

//12
router.put('/steden/:id', async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        postcode: joi.number().required(),
    })
    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const stad = await steden.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        postcode: req.body.postcode,
    }, {
        new: true
    });


    try{
        res.status(200).json(stad);
    } catch(err){
        res.status(500).json(err);
    }
})

//13
router.delete('/steden/:id', async (req, res) => {
    try{
        const result = await deleteStad(req.params.id);
        res.send(result);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})



module.exports = router;