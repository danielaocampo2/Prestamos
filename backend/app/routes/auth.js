//Rutas para acceder al método de login
const express = require('express');
const AuthCtrl = require('../controllers/authController');
const router = express.Router();

//le vamos a dar al router algunas rutas 
router.post('/login', AuthCtrl.login)

module.exports = router;