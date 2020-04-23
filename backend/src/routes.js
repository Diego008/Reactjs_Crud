const express = require('express');
const routes = express.Router();

const users = require('../controllers/UsersControllers');

routes.post('/', users.store);
routes.get('/allusers', users.index);
routes.get('/paginate/:page', users.pagination);
routes.get('/allusers/:id', users.indexOne);
routes.get('/deleteusers/:id', users.delete);

module.exports = routes;