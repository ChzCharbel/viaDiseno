const express = require('express');
const router = express.Router();
const inicioController = require('../controllers/inicio.controller');

router.get('/:idCiclo',inicioController.get_inicio);
router.post('/:idCiclo', inicioController.post_guardar);

module.exports = router;