const SolicitaCambio = require("../models/solicitudes.model");

exports.get_solicitudes = (request, response, next) => {
  SolicitaCambio.fetchAll()
    .then((solicitudes) => {
      request.session.solicitudes = solicitudes.rows;

      response.render("solicitudes.ejs", {
        titulo: "solicitudes",
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || "",
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || "",
        username: request.session.username || "",
        mail: request.session.mail || "",
        rol: request.session.rol || "",
        SolicitaCambio: solicitudes.rows,
      });
    })
    .catch((error) => {
      console.log(error);
      response.render("error.ejs");
    });
};
