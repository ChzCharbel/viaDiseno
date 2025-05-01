const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewOfertaAcademica');
const canRegister = require('../util/canRegisterOfertaAcademica');

const ofertaController = require('../controllers/oferta.controller');

router.get('/:idCiclo/:idPlan/eliminar/:idPlanMateria', isAuth, canRegister, ofertaController.delete_materia);

router.get('/:idCiclo/:idPlan/editar', isAuth, canRegister, ofertaController.get_editar);
router.post('/:idCiclo/:idPlan/editar', isAuth, canRegister, ofertaController.post_editar);

router.get('/:idCiclo/:idPlan/agregar', isAuth, canRegister, ofertaController.get_agregar);
router.post('/:idCiclo/:idPlan/agregar', isAuth, canRegister, ofertaController.post_agregar);

router.get('/:idCiclo/:idPlan', isAuth, canView, ofertaController.get_oferta);


module.exports = router;