//Configuraciones finales del servidor
const database = require('./app/config/database');//cargamos el modulo de conexión a la base de datos
const CONFIG = require('./app/config/config');//cargamos la configuracion
const app = require('./app/app');//cargamos el modulo app para que funcione
// conectamos la base de datos
database.connect();

//Le configuramos el puerto por el cual va funcionar nuestra app.
app.listen(CONFIG.PORT, function(error){
    if(error) return console.log(error);
    console.log(`Servidor corriendo en el puerto ${CONFIG.PORT}`);
});