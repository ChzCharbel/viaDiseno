const Profesor = require("../models/profesores.model");

exports.get_all_maestros = (request, response, next) => {
  Profesor.fetchAll()
    .then((profesores) => {
      console.log(profesores.rows);
      request.session.profesores = profesores.rows;
      response.render("profesores.ejs", {
        titulo: "maestros",
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || "",
        profesores: request.session.profesores || [],
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
};
