const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');
const auth = require('../../middlewares/auth');

router.post('/registro', controller.registro);
router.post('/login', controller.login);
router.get('/perfil', auth, controller.perfil);

module.exports = router;