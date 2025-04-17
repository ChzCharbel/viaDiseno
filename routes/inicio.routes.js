const express = require('express');
const router = express.Router();
const inicioController = require('../controllers/inicio.controller');

// Mostrar fechas confirmadas después de guardar
router.get('/inscripciones/:idCiclo/confirmacion', inicioController.get_inscripciones_guardadas);

// Mostrar el formulario
router.get('/:idCiclo', inicioController.get_inicio);

// Guardar las fechas
router.post('/:idCiclo', inicioController.post_guardar);

module.exports = router;