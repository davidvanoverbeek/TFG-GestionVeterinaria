const { idsMascotasUsuario, esMascotaDelUsuario } = require('../../utils/mascota');

const crearControlador = (Modelo, nombre, { ordenarPor = {}, despuesDeCrear } = {}) => {
  const buscarPropio = async (id, usuarioId) => {
    const doc = await Modelo.findById(id);
    if (!doc) return null;
    const propia = await esMascotaDelUsuario(doc.mascota, usuarioId);
    return propia ? doc : null;
  };

  return {
    crear: async (req, res) => {
      try {
        const propia = await esMascotaDelUsuario(req.body.mascota, req.usuario.id);
        if (!propia) return res.status(403).json({ error: 'La mascota no existe o no te pertenece' });

        const doc = await Modelo.create(req.body);
        if (despuesDeCrear) await despuesDeCrear(doc);

        res.status(201).json(doc);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    listar: async (req, res) => {
      try {
        const ids = await idsMascotasUsuario(req.usuario.id);
        const filtro = { mascota: { $in: ids } };

        if (req.query.mascota) {
          if (!ids.some((id) => id.equals(req.query.mascota))) {
            return res.status(403).json({ error: 'La mascota no te pertenece' });
          }
          filtro.mascota = req.query.mascota;
        }

        const docs = await Modelo.find(filtro).sort(ordenarPor);
        res.json(docs);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    obtener: async (req, res) => {
      try {
        const doc = await buscarPropio(req.params.id, req.usuario.id);
        if (!doc) return res.status(404).json({ error: `${nombre} no encontrado` });
        res.json(doc);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    actualizar: async (req, res) => {
      try {
        const doc = await buscarPropio(req.params.id, req.usuario.id);
        if (!doc) return res.status(404).json({ error: `${nombre} no encontrado` });

        const { mascota, ...datos } = req.body;
        Object.assign(doc, datos);
        await doc.save();

        res.json(doc);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    eliminar: async (req, res) => {
      try {
        const doc = await buscarPropio(req.params.id, req.usuario.id);
        if (!doc) return res.status(404).json({ error: `${nombre} no encontrado` });

        await doc.deleteOne();
        res.json({ mensaje: `${nombre} eliminado` });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };
};

module.exports = crearControlador;