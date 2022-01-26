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