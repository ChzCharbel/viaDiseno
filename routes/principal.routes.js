const express = require("express");
const router = express.Router();

const principalController = require("../controllers/principal.controller");

router.get("/principal/:idCicloEscolar", principalController.get_principal);

module.exports = router;

//este es al que mas le dudo
