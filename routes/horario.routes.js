const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horario.controller');
const horariosController = require('../controllers/horarios.controller');

router.post('/guardar/:idGrupo', horarioController.guardarHorario);
router.post('/generarTodos', horariosController.generarHorariosParaTodos);

module.exports = router;