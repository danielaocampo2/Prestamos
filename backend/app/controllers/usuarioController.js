//controller para el usuario
const usuarioM = require('../models/usuario');//Cargamos el modelo del usuario
const CONFIG = require('../config/config');//cargamos la configuracion de la conexion a la base de datos
const jwt = require('jsonwebtoken');//cargamos el modulo jsonwebtoken
//const nodemailer = require('nodemailer');

//Método encargado de estraerme todos los usuarios que hay en la base de datos
function index(req, res) {
    usuarioM.find({}).then(usuarios => {
        if (usuarios.length) return res.status(200).send({ usuarios });
        return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}
//Método que crea un nuevo registro de usuario en la base de datos.
function create(req, res) {
    //se inicializa una variable con los datos de mi body
    let usuario = new usuarioM(req.body);
    //guardo con el metodo save el nuevo usuario en la base de datos
    usuario.save().then(user => {
        //Mensaje de exito
        return res.status(201).send({ user, message: "El usuario fue creado exitosamente" });

    }).catch(error => res.status(422).send({ message: "El usuario ya existe", error }));//Mensaje cuando se intenta registrar un usuario que ya existe.
}

//Método que me busca un usuario especifico, buscado por el user_id.
function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let usuario = req.body.users;
    return res.status(200).send({ usuario });
}
//Funcion utilizada para actualizar los datos del usuario
function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let query = {};
    query[req.params.key] = req.params.value;
    let ussuario = req.body.users[0];
    if (req.body.names == undefined || req.body.names == "" || req.body.names == null) {
        req.body.names = ussuario.names;
    }
    if (req.body.email == undefined || req.body.email == "" || req.body.email == null) {
        req.body.email = ussuario.email;
    }
    if (req.body.phone == undefined || req.body.phone == "" || req.body.phone == null) {
        req.body.phone = ussuario.phone;
    }
    if (req.body.nicknames == undefined || req.body.nicknames == "" || req.body.nicknames == null) {
        req.body.nicknames = ussuario.nicknames;
    }

    let update = {
        names: req.body.names,
        email: req.body.email,
        phone: req.body.phone,
        nicknames:req.body.nicknames
    };
    usuarioM.updateOne(query, update, (err, user) => {
        if (err) res.status(500).send({ message: `Error ${err}` })
        res.status(200).send({ message: "Actualizacion correcta" })
    });
}
//Método utilizado para actualizar la contraseña del usuario
function updatePassword(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    //Se valida si no hay Users.
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let ussuario = req.body.users[0];
    if (req.body.password == undefined || req.body.password == "" || req.body.password == null) {
        return res.status(400).send({ error: "Password debe ser diferente de null" })
    }
    //creo un nuevo objeto con las cosas que quiero cambiarle
    ussuario = Object.assign(ussuario, req.body);
    ussuario.save().then(user => res.status(200).send({ message: "Contraseña Actualizada", user })).catch(error => res.status(500).send({ error }));
}
// como buscar se repite en show, update y remove hago una funcion
// es como un middleware el cual es el que se ejecuta en medio de otros controladores
function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    usuarioM.find(query).then(users => {
        //si no existen users
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        req.body.users = users;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    });
}




function privateTasks(req, res) {

    usuarioM.find().then(users => {
        //si no existen users
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        res.send({ users });

    }).catch(error => {
        req.body.error = error;
        next();
    });

}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'No posee headers para esta Request' });
    }
    const token = req.headers.authorization.split(' ')[1]; // para separar el token de bearer, toma solo el token
    if (token === 'null') {
        return res.status(401).send('no posee token para esta Request');
    }
    jwt.verify(token, CONFIG.SECRET_TOKEN, function(error) {
        if (error) return res.status(403).send({ message: 'Fallo al decodificar token', error });
        //req.userId = payload._id;
        next();
    });
}



//Exportamos los métodos para utilizarlos en el modulo routers
module.exports = {
    index,
    show,
    create,
    update,
    find,
    privateTasks,
    verifyToken,
    updatePassword
};