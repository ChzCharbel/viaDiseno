const express = require("express");
 const router = express.Router();
 const disponibleController = require("../controllers/disponible.controller");
 
 router.post("/guardar", disponibleController.guardarDisponibilidad);
 
 module.exports = router;