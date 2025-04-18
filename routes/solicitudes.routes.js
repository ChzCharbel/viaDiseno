const express = require("express");
const router = express.Router();

const isAuth = require("../util/is-auth");
const canView = require("../util/canViewSolicitudes");

const solicitudesController = require("../controllers/solicitudes.controller");

router.get('/solicitudes', isAuth, solicitudesController.mostrarSolicitudes);
router.get("/:idCiclo/", isAuth, canView, solicitudesController.get_solicitudes);
router.post("/cambio", isAuth, solicitudesController.enviarSolicitud);
router.put('/solicitud/:id', isAuth, solicitudesController.actualizarSolicitud);

module.exports = router;
