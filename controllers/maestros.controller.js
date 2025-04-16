const Profesor = require("../models/profesores.model");
const Materia = require("../models/materias.model");

exports.get_all_maestros = (request, response, next) => {
  Promise.all([
    Profesor.sincronizarDesdeAPI(),
    Materia.getAllCourses()
  ]).then(([profesoresData, materiasData]) => {
    console.log(profesoresData);
    Profesor.fetchAll()
    .then((profesores) => {
      request.session.profesores = profesores.rows;
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
      });
    })
    .catch((error) => {
      console.log(error);
      response.render("error.ejs");
    });
  }).catch((error) => {
    console.log(error);
  })
  
};
