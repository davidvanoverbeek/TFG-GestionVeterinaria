const Mascota = require('../api/models/Mascota');

exports.idsMascotasUsuario = async (usuarioId) => {
  const mascotas = await Mascota.find({ usuario: usuarioId }).select('_id');
  return mascotas.map((m) => m._id);
};

exports.esMascotaDelUsuario = (mascotaId, usuarioId) =>
  Mascota.exists({ _id: mascotaId, usuario: usuarioId });