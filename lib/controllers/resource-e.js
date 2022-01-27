const Router = require('express');
const ResourceE = require('../models/Resource-e');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try{
            const response = await ResourceE.insert({ ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }        
    })
    .get('/', async (req, res, next) => {
        try{
            const response = await ResourceE.getAll();
            res.send(response);
        } catch(err){
            next(err);
        }        
    })
