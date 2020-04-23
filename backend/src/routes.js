const express = require('express');
const routes = express.Router();

const users = require('../controllers/UsersControllers');

routes.post('/', users.store);
routes.get('/allusers', users.index);
routes.get('/paginate/:page', users.pagination);
routes.put('/edituser/:id', users.edit);
routes.delete('/deleteusers/:id', users.delete);

module.exports = routes;