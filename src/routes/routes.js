const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');

/* Definición de rutas del proyecto: http://localhost:3005 */
app.use('/users', userRoutes);

module.exports = app;