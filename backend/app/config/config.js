//Configuraciones para hacer la conexión a la base datos mongo.
module.exports = {
    HOST: process.env.HOST || "http://localhost",// dirección por la cual se va
    PORT: process.env.PORT || 3000,//Puerto de conexión
    //URI de conexión a la base de datos mongo en atlas
    DB: process.env.MONGODB_URI || 'mongodb+srv://prestamos:prestamos@cluster0.mclxx.mongodb.net/prestamos?retryWrites=true&w=majority',
    //Semilla para crear los tokens de autentificación 
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'prestamokey'
}