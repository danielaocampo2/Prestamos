const express = require('express');
const usuarioCtr = require('../controllers/usuarioController');
const routerU = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
routerU.post('/', usuarioCtr.create) 
    .get('/:key/:value', usuarioCtr.find, usuarioCtr.show) 
    .put('/:key/:value', usuarioCtr.find, usuarioCtr.update) 
    .put('/password/:key/:value', usuarioCtr.find, usuarioCtr.updatePassword)
    .get('/private-tasks' ,usuarioCtr.verifyToken , usuarioCtr.privateTasks)


module.exports = routerU;