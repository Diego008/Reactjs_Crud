require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const port = process.env.PORT || 3333;
const paginate = require('express-paginate');
const database = require('../database/index');
const path = require('path');

const app = express();

app.use(express.json());
app.use(paginate.middleware(3, 50));
app.use(cors());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp", "uploads")));
app.listen(port, () => {
    console.log(`Projeto executando na porta: ${port}`)
});