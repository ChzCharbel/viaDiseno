const Materia = require('../models/materias.model');
const Salon = require('../models/salones.model');

exports.getMateriasCiclo = async (req, res) => {
  const idCiclo = req.params.idCiclo;

  try {
    const [materias, salonesResult] = await Promise.all([
      Materia.getMateriasConProfesorPorCiclo(idCiclo),
      Salon.fetchAll()
    ]);

    console.log("Materias recuperadas con profesor:", materias);

    res.render('materias.ejs', {
        materias,
        salones: salonesResult.rows || [],
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