const express = require("express");
const router = express.Router();

const isAuth = require("../util/is-auth");

const principalController = require("../controllers/principal.controller");

router.get("/principal/:idCicloEscolar", isAuth, principalController.get_principal);

module.exports = router;

