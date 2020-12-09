//Controller uitilado para hacer el login.
const usuario = require('../models/usuario'); //Cargamos el modelo usuario
//const Owner = require('../models/Owner');
const bcrypt = require('bcrypt'); //Cargamos el modulo bcrypt
const jwt = require('jsonwebtoken'); //Cargamos el modulo jsonwebtoken
const CONFIG = require('../config/config'); //Cargamos el modulo de configuracion

//Método utilizado para que el usuario inicie sesión en la página.
function login(req, res) {
    let email = req.body.email; //extraemos lo del campo email
    let password = req.body.password; //extraemos lo del campo password

    //Buscamos el email ingresado
    usuario.findOne({ email }).then(user => { // se puede solo username
        if (!user) res.status(404).send({ message: "El usuario no existe" });
        //si existe, hago mi logica de login
        bcrypt.compare(password, user.password) //compramos si las contraseñas coinciden
            .then(match => {
                if (match) {
                    if (user.status == 1) { //verificamos que el usuario no esté baneado o expulsado
                        payload = { //Cargamos los datos necesarios del usuario para ser enviados
                                email: user.email,
                                names: user.names,
                                nicknames: user.nicknames,
                                _id: user._id,
                                id_user: user.id_user
                            }
                            //verifiacmos si los datos fueron enviados de manera exitosa y así perimitir el acceso.
                        jwt.sign(payload, CONFIG.SECRET_TOKEN, function(error, token) {
                            if (error) {
                                res.status(500).send({ error }); //Enviamos mensaje de error  
                            } else {
                                res.status(200).send({ message: "accedido", token, id: payload.id_user, names: payload.names }); //Enviamos mensaje de conexión exitosa.
                            }
                        });
                    } else {
                        res.status(200).send({ message: "Empleado desactivado" }); //Enviamos mensaje de error cuando el usuario esta baneado,desactivado o bloqueado.
                    }

                } else {
                    res.status(200).send({ message: "Password mala" }); //Enviamos mensaje de error  cuando las contraseñas no coinciden.
                }

            }).catch(error => {
                console.log(error);
                res.status(400).send({ error: "el campo email y password, son requeridos" }); //Enviamos mensaje de error cuando los campos están basidos
            });
    }).catch(error => {
        console.log(error);
        res.status(400).send({ error: "Campo no encontrados" }); //Enviamos mensaje de error cuando los datos ingresado no están el base de datos.
    });

}


//exportamos las funciones o metodos para utilizarlos en el modulo de routers
module.exports = {
    login
};