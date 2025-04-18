const Materia = require('../models/materias.model');

exports.getMateriasCiclo = async (req, res) => {
  const idCiclo = req.params.idCiclo;

  try {
    const materias = await Materia.getMateriasConProfesorPorCiclo(idCiclo);

    console.log("Materias recuperadas con profesor:", materias);

    res.render('materias.ejs', {
        materias,
        salones: [],
        cicloActual: idCiclo,
        csrfToken: req.csrfToken(),
        rol: req.session.rol || "",
        ciclosEscolares: req.session.ciclosEscolares || [],
        titulo: "materias",
        username: req.session.username || "",
        mail: req.session.mail || "",
    });
  } catch (err) {
    console.error("Error en getMateriasCiclo:", err);
    res.status(500).send("Error al obtener las materias");
  }
};