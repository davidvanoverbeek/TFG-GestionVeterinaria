const Tratamiento = require('../models/Tratamiento');
const crearControlador = require('./crud.factory');

module.exports = crearControlador(Tratamiento, 'Tratamiento', {
  ordenarPor: { fechaInicio: -1 }
});