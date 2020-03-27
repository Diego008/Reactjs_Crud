const express = require('express');
const routes = require('./routes');
const database = require('../database/index');

const app = express();

app.use(express.json());
app.use(routes);
app.listen(3333);