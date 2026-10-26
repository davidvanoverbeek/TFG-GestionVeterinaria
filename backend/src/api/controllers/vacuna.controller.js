const Vacuna = require('../models/Vacuna');
const Evento = require('../models/Evento');
const crearControlador = require('./crud.factory');

module.exports = crearControlador(Vacuna, 'Vacuna', {
  ordenarPor: { fechaAplicacion: -1 },
  despuesDeCrear: async (vacuna) => {
    if (vacuna.proximaDosis) {
      await Evento.create({
        titulo: `Próxima dosis: ${vacuna.nombre}`,
        tipo: 'vacuna',
        fecha: vacuna.proximaDosis,
        descripcion: vacuna.notas,
        mascota: vacuna.mascota
      });
    }
  }
});