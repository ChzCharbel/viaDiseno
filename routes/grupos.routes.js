const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/grupos.controller');
const horariosController = require('../controllers/horarios.controller');

router.post('/asignar-salon', gruposController.asignarSalonPorMateria);

// nueva ruta para fetch("/grupos/datos")
router.get('/datos', gruposController.getDatosGrupos);
router.post('/horarios', horariosController.generarHorariosParaTodos);

module.exports = router;
