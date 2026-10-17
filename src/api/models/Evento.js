const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipo: { type: String, enum: ['vacuna', 'tratamiento', 'revision', 'otro'], required: true },
  fecha: { type: Date, required: true },
  descripcion: { type: String },
  completado: { type: Boolean, default: false },
  mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Evento', eventoSchema);