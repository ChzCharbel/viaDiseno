const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');

const creacionGruposController = require('../controllers/creacion.grupos.controller');

router.get('/crear/:idCiclo', isAuth, creacionGruposController.get_crear);

router.get('/creados/:idCiclo', isAuth, creacionGruposController.get_creados);

module.exports = router;