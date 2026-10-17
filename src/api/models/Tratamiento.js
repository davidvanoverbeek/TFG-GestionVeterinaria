const { mongo } = require("mongoose");
const { required } = require("nodemon/lib/config");

const mongoose = require('mongoose');

const tratamientoSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['comida especial', 'medicacion', 'otro'], required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date },
    frecuencia: { type: String },
    mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required:true }
},{
    timestamps: true
});

module.exports = mongoose.model('Tratamiento', tratamientoSchema);