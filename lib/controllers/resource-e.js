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
    .get('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceE.getById(id);
            res.send(response);
        } catch(err){
            next(err);
        }        
    })
    .patch('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceE.updateById(id, { ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }        
    })
