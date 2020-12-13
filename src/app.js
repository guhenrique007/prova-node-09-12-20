// Carregando dependências
const { resolve } = require('path');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

// Instanciando express
const app = express();

// Conexão com o Database
require('./db/connection');

// Carregando Rotas
const userRoutes = require('./routes/userRoutes');

// Usando BodyParser na aplicação
app.use(bodyParser.json({ limit: process.env.MAX_SIZE_IMG + 'mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Habilitando CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
  res.header('Access-Control-Allow-Headers', process.env.ALLOW_HEADERS);
  res.header('Access-Control-Allow-Methods', process.env.ALLOW_METHODS);
  next();
});

// Usando rotas na aplicação
app.use('/users', userRoutes);


module.exports = app;
