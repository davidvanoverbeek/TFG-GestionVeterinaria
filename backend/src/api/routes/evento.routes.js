const express = require('express');
const router = express.Router();
const controller = require('../controllers/evento.controller');
const auth = require('../../middlewares/auth');

router.use(auth);

router.post('/', controller.crear);
router.get('/', controller.listar);
router.get('/proximos', controller.proximos); // siempre antes de /:id

router.get('/:id', controller.obtener);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;