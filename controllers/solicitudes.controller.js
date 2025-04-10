exports.get_solicitudes = (request, response, next) => {
  console.log("usuario:", request.session.username);
  console.log("privilegios:", request.session.privilegios);

  response.render("solicitudes.ejs", {
    titulo: "solicitudes",
    privilegios: request.session.privilegios || [],
    carrera: request.session.carrera || "",
    ciclosEscolares: request.session.ciclosEscolares || [],
    cicloActual: request.params.idCiclo || "",
    username: request.session.username || "",
    mail: request.session.mail || "",
    rol: request.session.rol || "",
  });
};
