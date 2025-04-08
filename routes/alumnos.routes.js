const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canViewAll = require('../util/canViewAlumnos');
const canViewSelf = require('../util/canViewAssignedGroups');

const alumnosController = require('../controllers/alumnos.controller');

router.get('/regulares/:idCiclo', isAuth, canViewSelf, alumnosController.get_horario_alumnos_regulares);
router.get('/irregulares/:idCiclo', isAuth, canViewSelf, alumnosController.get_horario_alumnos_regulares);
router.get('/:idCiclo/buscar/:nombre', isAuth, canViewAll, alumnosController.get_buscar);
router.get('/:idCiclo/', isAuth, canViewAll, alumnosController.get_alumnos);



module.exports = router;