const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./src/api/routes/usuario.routes');
const mascotaRoutes = require('./src/api/routes/mascota.routes');
const vacunaRoutes = require('./src/api/routes/vacuna.routes');
const tratamientoRoutes = require('./src/api/routes/tratamiento.routes');
const eventoRoutes = require('./src/api/routes/evento.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/vacunas', vacunaRoutes);
app.use('/api/tratamientos', tratamientoRoutes);
app.use('/api/eventos', eventoRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Gestion de Mascotas activa' });
});

app.use((req, res) => {
    res.statusCode(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'error interno del servidor' });
});

module.exports = app;