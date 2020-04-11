const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const port = process.env.PORT || 3333;
const database = require('../database/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(port, () => {
    console.log(`Projeto executando na porta: ${port}`)
});