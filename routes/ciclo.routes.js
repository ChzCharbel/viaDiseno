const express = require('express');
const router = express.Router();
const cicloController = require('../controllers/ciclo.controller');

// Mostrar las fechas ya inscritas (confirmación)
router.get('/inscripciones/:idCiclo/confirmacion', cicloController.get_inscripciones_guardadas);

// Mostrar el formulario para configurar fechas de inscripción
router.get('/inscripciones/:idCiclo', cicloController.get_inscripciones_form);

// Guardar las fechas de inscripción
router.post('/inscripciones/:idCiclo', cicloController.post_inscripciones);

module.exports = router;