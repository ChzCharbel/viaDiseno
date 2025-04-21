const EstadisticasModel = require("../models/principal.model");

exports.get_principal = async (req, res, next) => {
  const idCiclo = req.params.idCicloEscolar;

  try {
    const materiasPorSemestre = await EstadisticasModel.getMateriasPorSemestre(idCiclo);
    const regularesIrregulares = await EstadisticasModel.getRegularesVsIrregulares();

    res.render("principal.ejs", {
      titulo: "principal",
      cicloActual: idCiclo,
      privilegios: req.session.privilegios || [],
      carrera: req.session.carrera || "",
      username: req.session.username || "",
      rol: req.session.rol || "",
      mail: req.session.mail || "",
      ciclosEscolares: req.session.ciclosEscolares || [],
      materiasPorSemestre,
      regularesIrregulares
    });
  } catch (err) {
    console.error("Error al cargar la vista principal:", err);
    res.status(500).send("Error interno del servidor");
  }
};