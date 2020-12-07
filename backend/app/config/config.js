module.exports = {
    HOST: process.env.HOST || "http://localhost",
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODB_URI || 'mongodb+srv://prestamos:prestamos@cluster0.mclxx.mongodb.net/prestamos?retryWrites=true&w=majority',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'prestamokey'
}