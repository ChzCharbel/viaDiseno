const express = require("express");
const router = express.Router();

const isAuth = require("../util/is-auth");
const canView = require("../util/canViewSolicitudes");

const solicitudesController = require("../controllers/solicitudes.controller");

router.get(
  "/:idCiclo/",
  isAuth,
  canView,
  solicitudesController.get_solicitudes
);

module.exports = router;
