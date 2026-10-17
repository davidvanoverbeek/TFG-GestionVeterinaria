const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    raza: { type: String },
    fechaNacimiento: { type: Date },
    peso: { type: Number },
    foto: { type: String },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
},
{
    timestamps: true
});

module.exports = mongoose.model('Mascota', mascotaSchema);