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