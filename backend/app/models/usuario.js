//Modelo del registro del usuario
const mongoose = require('mongoose');//Cargamos el modulo de mongoose para hacer el mapeo a la base de datos
const bcrypt = require('bcrypt');//Cargamos el modulo bcrypt para hacer un encriptamiento de la contraseña.

const usuarioSchema = new mongoose.Schema({
    //Nombres del usuario
    names: {
        type: String,
        required: true
    },
    //Apellidos
    nicknames:{
        type:String,
        required:true
    },
    //Número de identificación
    id_user: {
        type: String,
        required: true,
        unique: true
    },
    //correo del usuario, que es como el username
    email: {
        type: String,
        unique: true,
        required: true
    },
    //contraseña para acceder al contenido de la página
    password: {
        type: String,
        required: true
    },
    //Fecha de inicio de sesión en la página por primera vez
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    //última fecha de inisio de sesión
    last_login_date: {
        type: Date,
        default: Date.now()
    },
    //Utilizado para hacer un borrado lógico de la página, por si el usuario incumple alguna regla.
    status: {
        type: String,
        default: "1"
    },
    //Número de contacto del usuario.
    phone: {
        type: String,
        required: true
    }
});
//Aquí encriptamos la contraseña entrada por el usuario.
usuarioSchema.pre('save', function(next) {

    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));

});

const usuario = mongoose.model('usuario', usuarioSchema);
//Exporytamos el modelo para utilizarlo en otra parte del proyecto.
module.exports = usuario;