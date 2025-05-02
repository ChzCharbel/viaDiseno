const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewMaterias.js');

// Controlador de vista general de materias con profesor
const materiasVistaController = require('../controllers/materia.profesor.controller.js');

// Controlador de funciones específicas (horario, salones, etc.)
const materiasController = require('../controllers/materias.controller.js');

// Controlador de creacion de grupos automaticos
const crearGruposController = require('../controllers/creacion.grupos.controller.js');

// Ruta para obtener las materias que no han sido asignadas
router.get('/no_asignadas/:idCiclo/', isAuth, canView, materiasVistaController.get_no_asignadas);

// Ruta para obtener las materias que han sido asignadas automaticamente
router.get('/automaticamente_asignadas/:idCiclo/', isAuth, canView, crearGruposController.get_asignadas_automaticamente);

// Ruta principal que muestra las materias (con profesor)
router.get('/:idCiclo/', isAuth, canView, materiasVistaController.getMateriasCiclo);

// Ruta para guardar horarios
router.post('/guardar-horario', isAuth, canView, materiasController.guardarHorario);


module.exports = router;