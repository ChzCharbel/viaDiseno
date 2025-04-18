const express = require("express");
const router = express.Router();

const isAuth = require("../util/is-auth");
const canView = require("../util/canViewSolicitudes");

const solicitudesController = require("../controllers/solicitudes.controller");

const csrf = require("csurf");
const csrfProtection = csrf(); 



router.get("/:idCiclo/", isAuth, canView,solicitudesController.get_solicitudes);


router.post("/cambio", isAuth, csrfProtection, solicitudesController.enviarSolicitud);
router.put("/solicitud/:id", isAuth, csrfProtection, solicitudesController.actualizarSolicitud);


router.get("/solicitudes", isAuth, solicitudesController.mostrarSolicitudes);
module.exports = router;
