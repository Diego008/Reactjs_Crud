const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const users = require('../controllers/UsersControllers');

routes.post('/', multer(multerConfig).single('image_url'), users.store);
routes.get('/allusers/:find', users.index);
routes.get('/paginate/:page', users.pagination);
routes.put('/edituser/:id', users.edit);
routes.delete('/deleteusers/:id', users.delete);

module.exports = routes;