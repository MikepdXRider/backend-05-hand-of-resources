const Router = require('express');
const ResourceA = require('../models/Resource-a');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try{
            const response = await ResourceA.insert({ ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try{
            const response = await ResourceA.getAll();
            res.send(response);
        } catch(err){
            next(err);
        }
    })