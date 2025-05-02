const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/grupos.controller');
const horariosController = require('../controllers/horarios.controller');

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewAllGroups');

router.get('/asignar/existente/:idGrupo/:idSalon', isAuth, canView, gruposController.get_asignar_salon_grupo);

router.post('/asignar-salon', isAuth, gruposController.asignarSalonPorMateria);

// nueva ruta para fetch("/grupos/datos")
router.get('/datos', isAuth, gruposController.getDatosGrupos);
router.post('/horarios', isAuth, horariosController.generarHorariosParaTodos);

router.get('/:idCiclo', isAuth, canView, gruposController.get_grupos);

module.exports = router;
