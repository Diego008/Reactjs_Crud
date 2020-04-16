const express = require('express');
const routes = express.Router();

const users = require('../controllers/UsersControllers');

routes.post('/', users.store);

module.exports = routes;