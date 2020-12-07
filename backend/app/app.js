const express = require('express');
const bodyParser = require('body-parser');
const User = require('./routes/usuario');
const Auth = require('./routes/auth');
const app = express();
const cors = require('cors');
const usuario = require('./models/usuario');
app.use(cors());

//para poder manejar jsons, peticiones y respuestas 
app.use(bodyParser.json({limit: '50mb'}));
//se dice que no utilizamos peticiones directamente en formularios, sino que se procesa en formato json
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));


// creo el path primero /user y ya lo que sigue de la , es el product que puede variar
app.use('/usuario', usuario);
// crea el path /auth
app.use('/auth', Auth);

module.exports = app;