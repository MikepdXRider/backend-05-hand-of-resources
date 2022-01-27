const Router = require('express');
const ResourceB = require('../models/Resource-b');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try{
            const response = await ResourceB.insert({ ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try{
            const response = await ResourceB.getAll();
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceB.getById(id);
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceB.updateById(id, { ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceB.deleteById(id);
            res.send(response);
        } catch(err){
            next(err);
        }
    })