const usuario = require('../models/usuario');
//const Owner = require('../models/Owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    usuario.findOne({ email }).then(user => { // se puede solo username
        if (!user) res.status(404).send({ message: "El usuario no existe" });
        //si existe, hago mi logica de login
        bcrypt.compare(password, user.password)
            .then(match => {
                if (match) {
                    if (user.status == 1) {
                        payload = { 
                                email: user.email,
                                name: user.name,
                                _id: user._id,
                                id_user: user.id_user
                            }
                        jwt.sign(payload, CONFIG.SECRET_TOKEN, function(error, token) {
                            if (error) {
                                res.status(500).send({ error });
                            } else {
                                res.status(200).send({ message: "accedido", token, id: payload.id_user });
                            }
                        });
                    } else {
                        res.status(200).send({ message: "Empleado desactivado" });
                    }

                } else {
                    res.status(200).send({ message: "Password mala" }); 
                }

            }).catch(error => { 
                console.log(error);
                res.status(400).send({ error: "el campo email y password, son requeridos" });
            });
    }).catch(error => { 
        console.log(error);
        res.status(400).send({ error: "Campo no encontrados" });
    });

}



module.exports = {
    login
};