const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horario.controller');

router.post('/guardar/:idGrupo', horarioController.guardarHorario);

module.exports = router;