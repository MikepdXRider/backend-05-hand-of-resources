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
    .get('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceA.getById(id);
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceA.updateById(id, { ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceA.deleteById(id);
            res.send(response);
        } catch(err){
            next(err);
        }
    })