const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "1"
    },
    phone: {
        type: String,
        required: true
    }
});
usuarioSchema.pre('save', function(next) {

    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));

});

const usuario = mongoose.model('usuario', usuarioSchema);

module.exports = usuario;