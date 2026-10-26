const mongoose = require('mongoose');

const vacunaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fechaAplicacion: { type: String, required: true },
    proximaDosis: { type: Date },
    veterinario: { type: String },
    notas: { type: String },
    mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true }
},
{
    timestamps: true
});

module.exports = mongoose.model('Vacuna', vacunaSchema);