const express = require('express');
const routes = express.Router();

const users = require('../controllers/UsersControllers');

routes.post('/', users.store);
routes.get('/allusers', users.index);

module.exports = routes;