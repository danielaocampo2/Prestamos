//Conexion a la base de datos
const moongose = require('mongoose');//Cargamos el modulo Mongoose
const CONFIG = require('./config');//Cargamos el modulo de configuracion

//Método por el cual hacemos conexión a la base de datos.
module.exports = {
    connection: null,
        connect: function(){
        if(this.connection) return this.connection;
        return moongose.connect(CONFIG.DB).then(connection => {
            this.connection= connection;
            console.log('Conexion a base de datos exitosa');
        }).catch(error => console.log(error));
    }

}