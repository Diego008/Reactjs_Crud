const express = require('express');
const routes = express.Router();

const users = require('../controllers/UsersControllers');

// routes.get('/', (req, res) => {
//     res.json({message: 'Start Backend'})
// })

routes.post('/', users.store);

module.exports = routes;