const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canViewAll = require('../util/canViewAlumnos');
const canViewSelf = require('../util/canViewAssignedGroups');

const alumnosController = require('../controllers/alumnos.controller');

router.get('/:idCiclo/horario/:idIVD/eliminar/:idMateria', isAuth, canViewAll, alumnosController.get_eliminar_grupo);
router.get('/:idCiclo/horario/:idIVD/editar', isAuth, canViewAll, alumnosController.get_editar_horario);
router.get('/:idCiclo/horario/:idIVD', isAuth, canViewAll, alumnosController.get_horario);
router.get('/regulares/:idCiclo', isAuth, canViewSelf, alumnosController.get_horario_alumnos_regulares);
router.get('/irregulares/:idCiclo', isAuth, canViewSelf, alumnosController.get_horario_alumnos_regulares);
router.get('/:idCiclo/buscar/:nombre', isAuth, canViewAll, alumnosController.get_buscar);
router.get('/:idCiclo/', isAuth, canViewAll, alumnosController.get_alumnos);

module.exports = router;