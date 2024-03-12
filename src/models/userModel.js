
// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    correo: String,
    ciudad: String,
    país: String,
    salario: Number,
    edad: Number,
    altura: Number,
    peso: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
