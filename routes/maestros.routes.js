const express = require("express");
const router = express.Router();

const isAuth = require("../util/is-auth");
const canView = require("../util/canViewProfesores");

const maestrosController = require("../controllers/maestros.controller");

// GET /maestros
router.get("/:idCiclo/agregar", isAuth, canView, (request, response, next) => {
  response.render("agregar_maestros");
});

// POST /maestros
router.post("/:idCiclo/agregar", isAuth, canView, (request, response, next) => {
  console.log(request.body);
  maestros.push(request.body.nombre);

  const maestros = [];
  response.render("lista_maestros", {
    maestros: maestros,
  });
});

router.get("/:idCiclo/", isAuth, canView, maestrosController.get_all_maestros);

module.exports = router;
