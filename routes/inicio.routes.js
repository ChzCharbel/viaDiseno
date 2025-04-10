const express = require('express');
const router = express.Router();
const inicioController = require('../controllers/inicio.controller');

// Ruta para mostrar el formulario de fechas
router.get('/:idCiclo', inicioController.get_inicio);

// Ruta para guardar las fechas
router.post('/:idCiclo', inicioController.post_guardar);

// Ruta para mostrar las fechas en grande después de guardar
router.get('/inscripciones/:idCiclo', inicioController.get_inscripciones_guardadas);

module.exports = router;