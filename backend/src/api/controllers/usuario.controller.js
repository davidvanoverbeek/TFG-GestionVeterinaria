const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'La contaseña debe tener al menos 6 caracteres' });
        }

        const existe = await Usuario.findOne({ email: email.toLowerCase() });
        if (existe) return res.status(409).json({ error: 'YTa existe un usuario con ese email' })
            
        const hash = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({ nombre, email, password: hash });

        res.status(201).json({
            token: generarToken(usuario._id),
            usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        const usuario = await Usuario.findOne({ email: email.toLowerCase() }).select('+password');
        if (!usuario) return res.status(401).json({ error: 'Credenciales incorrectas' });

        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) return res.status(401).json({ error: 'Credenciales incorrectas' });

        res.json({
            token: generarToken(usuario._id),
            usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.perfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};