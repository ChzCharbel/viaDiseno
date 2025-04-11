const express = require("express");
 const router = express.Router();
 const disponibleController = require("../controllers/disponible.controller");
 
 router.post("/guardar", disponibleController.guardarDisponibilidad);
 router.get("/obtener/:idCiclo?", disponibleController.obtenerDisponibilidades);
 router.get("/obtener/:idCiclo?/:matriculaProfesor", disponibleController.obtenerDisponibilidadProfesor);
 
 module.exports = router;