const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/grupos.controller');

router.post('/asignar-salon', gruposController.asignarSalonPorMateria);
router.post('/asignar-horario', gruposController.asignarHorarioAGrupo);
router.get('/datos', gruposController.getDatosGrupos);

module.exports = router;