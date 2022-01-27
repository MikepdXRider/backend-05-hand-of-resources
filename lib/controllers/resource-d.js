const Router = require('express');
const ResourceD = require('../models/Resource-d.js');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try{
            const response = await ResourceD.insert({ ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try{
            const response = await ResourceD.getAll();
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceD.getById(id);
            res.send(response);
        } catch(err){
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceD.udpateById(id, { ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })