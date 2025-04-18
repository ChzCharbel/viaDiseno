const Profesor = require("../models/profesores.model");
const Materia = require("../models/materias.model");

exports.get_all_maestros = (request, response, next) => {
  Promise.all([
    Profesor.sincronizarDesdeAPI(),
    Materia.getMateriasPorCiclo(request.params.idCiclo)
  ])
  .then(([profesoresData, materiasData]) => {
    Profesor.fetchAll()
      .then(async (profesoresData) => {
        const profesores = profesoresData.rows;

        // Cargar las materias asignadas para cada profesor en este ciclo
        for (let profesor of profesores) {
          const materiasAsignadas = await Profesor.obtenerMateriasAsignadas(
            profesor.id_profesor,
            request.params.idCiclo
          );
          profesor.materias_asignadas = materiasAsignadas || [];
        }

        request.session.profesores = profesores;
        request.session.cicloActual = request.params.idCiclo;

        response.render("profesores.ejs", {
          titulo: "maestros",
          privilegios: request.session.privilegios || [],
          carrera: request.session.carrera || "",
          profesores: request.session.profesores || [],
          materias: materiasData || [],
          ciclosEscolares: request.session.ciclosEscolares || [],
          cicloActual: request.params.idCiclo || "",
          username: request.session.username || "",
          mail: request.session.mail || "",
          rol: request.session.rol || "",
          csrfToken: request.csrfToken()
        });
      })
      .catch((error) => {
        console.log(error);
        response.render("error.ejs");
      });
  })
  .catch((error) => {
    console.log(error);
  });
};

exports.post_asignar_materias = async (req, res, next) => {
  const id_profesor = req.body.id_profesor;
  let materias = req.body["materias[]"];

  console.log("Materias seleccionadas:", materias);

  if (!materias) {
    materias = [];
  }

  if (!Array.isArray(materias)) {
    materias = [materias];
  }

  try {
    await Profesor.eliminarMateriasAsignadas(id_profesor);

    for (const id_cem of materias) {
      if (id_cem) {
        await Profesor.asignarMateria(id_profesor, id_cem);
      }
    }

    res.redirect(`/maestros/${req.session.cicloActual}`);
  } catch (error) {
    console.error("Error al asignar materias:", error);
    res.render("error.ejs");
  }
};