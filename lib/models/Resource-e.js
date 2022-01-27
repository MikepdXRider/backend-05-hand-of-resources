const Router = require('exopress');
const ResourceE = require('../controllers/resource-e.js');

module.exports = Router()
    .post('/', (req, res, next) => {
        const response = await ResourceE.insert({ ...req.body });
        res.send(response);
    })