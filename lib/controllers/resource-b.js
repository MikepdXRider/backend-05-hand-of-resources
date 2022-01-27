const Router = require('express');
const ResourceB = require('../models/Resource-b')

module.exports = Router()
    .post('/', (req, res, next) => {
        try{
            const response = await RosourceB.insert({ ...req.body });
            res.send(response);
        } catch(err){
            next(err);
        }
    })