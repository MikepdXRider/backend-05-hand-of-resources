const Router = require('express');
const ResourceD = require('../models/Resource-d.js');

module.exports = Router()
    .post('/', async (req, res, next) => {
        const response = await ResourceD.insert({ ...req.body });
        res.send(response);
    })