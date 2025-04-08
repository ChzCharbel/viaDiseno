const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewPlanes');

const planesController = require('../controllers/planes.controller');

router.get('/:idCiclo/', isAuth, canView, planesController.get_planes);

module.exports = router;