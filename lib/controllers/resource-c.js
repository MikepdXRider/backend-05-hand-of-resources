const Router = require('express');
const ResourceC = require('../models/Resource-c.js');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try{
            const response = await ResourceC.insert({ ...req.body })
            res.send(response);
        } catch(err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try{
            const response = await ResourceC.getAll();
            res.send(response);
        } catch(err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceC.getById(id);
            res.send(response);
        } catch(err) {
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceC.updateById(id, { ...req.body });
            res.send(response);
        } catch(err) {
            next(err);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const response = await ResourceC.deleteById(id);
            res.send(response);
        } catch(err) {
            next(err);
        }
    })