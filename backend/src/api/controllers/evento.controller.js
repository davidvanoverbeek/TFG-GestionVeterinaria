const Evento = require('../models/Evento');
const crearControlador = require('./crud.factory');
const { idsMascotasUsuario } = require('../../utils/mascota');

const controlador = crearControlador(Evento, 'Evento', {
  ordenarPor: { fecha: 1 }
});

controlador.proximos = async (req, res) => {
  try {
    const ids = await idsMascotasUsuario(req.usuario.id);
    const filtro = {
      mascota: { $in: ids },
      fecha: { $gte: new Date() },
      completado: false
    };

    if (req.query.mascota) {
      if (!ids.some((id) => id.equals(req.query.mascota))) {
        return res.status(403).json({ error: 'La mascota no te pertenece' });
      }
      filtro.mascota = req.query.mascota;
    }

    const eventos = await Evento.find(filtro).sort({ fecha: 1 });
    res.json(eventos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = controlador;