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

exports.get_no_asignadas = (request, response, next) => {
    Materia.fetchMateriasNoAsignadas(request.params.idCiclo).then((materiasNoAsignadas) => {
      Salon.fetchAll().then((salones) => {
        response.render('materias_no_asignadas.ejs', {
          titulo: 'materias_no_asignadas' || '',
          materias: materiasNoAsignadas.rows || [],
          salones: salones.rows || [],
          privilegios: request.session.privilegios || [],
          csrfToken: request.csrfToken(),
          carrera: request.session.carrera || '',
          ciclosEscolares: request.session.ciclosEscolares || [],
          cicloActual: request.params.idCiclo || '',
          username: request.session.username || '',
          mail: request.session.mail || '',
          rol: request.session.rol || '',
        });
        }).catch((error) => {
          console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })
}