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