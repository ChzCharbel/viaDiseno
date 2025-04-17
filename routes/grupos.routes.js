const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/grupos.controller');

router.post('/asignar-salon', gruposController.asignarSalonPorMateria);

// nueva ruta para fetch("/grupos/datos")
router.get('/datos', gruposController.getDatosGrupos);

module.exports = router;
