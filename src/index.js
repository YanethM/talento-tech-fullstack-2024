/* Importaciones */
const express = require('express');
require('dotenv').config();

/* Importar rutas y conexión a la DB*/
const connectDB = require('../config/database');
const routes = require('./routes/routes');

/* Crear sinonimo para express */
const app = express();
/* Configuración del servidor */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
})

/* Habilitar middleware de express para leer archivos JSON */
app.use(express.json());

/* Uilizar rutas importadas */
app.use('/api/v1', routes);

/* Conexión a la base de datos */
connectDB();

