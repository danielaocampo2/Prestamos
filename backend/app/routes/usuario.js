//Rutas para acceder a los métodos del usuaro.
const express = require('express');//cargamos el modulo express
const usuarioCtr = require('../controllers/usuarioController');//Cargamos el controller del usuario
const routerU = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
routerU.post('/', usuarioCtr.create)//Registrar un usuario en la base de datos
    .get('/', usuarioCtr.find, usuarioCtr.index)//extraer todos los usuario
    .get('/:key/:value', usuarioCtr.find, usuarioCtr.show)//buscar un usuario especifico
    .put('/:key/:value', usuarioCtr.find, usuarioCtr.update)//actualoioizar información del usuario
    .put('/password/:key/:value', usuarioCtr.find, usuarioCtr.updatePassword)//Actualixar contraseña
    .get('/private-tasks', usuarioCtr.verifyToken, usuarioCtr.privateTasks)

//Exportamos el modulo.
module.exports = routerU;