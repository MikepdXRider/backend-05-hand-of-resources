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