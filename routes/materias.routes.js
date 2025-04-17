const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewMaterias.js');

const materiasController = require('../controllers/materias.controller.js');

const grupoHorarioController = require('../controllers/materias.controller.js');

router.get('/:idCiclo/', isAuth, canView, materiasController.get_materias);

// Ruta para guardar horarios
router.post('/guardar-horario/:id_grupo',isAuth, canView, materiasController.guardarHorario);

module.exports = router;