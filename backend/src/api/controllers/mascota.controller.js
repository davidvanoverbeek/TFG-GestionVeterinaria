const Mascota = require('../models/Mascota');
const Vacuna = require('../models/Vacuna');
const Tratamiento = require('../models/Tratamiento');
const Evento = require('../models/Evento');

exports.crear = async (req, res) => {
  try {
    const { usuario, ...datos } = req.body;
    const mascota = await Mascota.create({ ...datos, usuario: req.usuario.id });
    res.status(201).json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const mascotas = await Mascota.find({ usuario: req.usuario.id }).sort({ nombre: 1 });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const mascota = await Mascota.findOne({ _id: req.params.id, usuario: req.usuario.id });
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { usuario, ...datos } = req.body;
    const mascota = await Mascota.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuario.id },
      datos,
      { new: true, runValidators: true }
    );
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const mascota = await Mascota.findOneAndDelete({ _id: req.params.id, usuario: req.usuario.id });
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

    await Promise.all([
      Vacuna.deleteMany({ mascota: mascota._id }),
      Tratamiento.deleteMany({ mascota: mascota._id }),
      Evento.deleteMany({ mascota: mascota._id })
    ]);

    res.json({ mensaje: 'Mascota y datos asociados eliminados' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};