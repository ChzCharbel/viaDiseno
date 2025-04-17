const SolicitaCambio = require("../models/solicitudes.model");

exports.get_solicitudes = (request, response, next) => {
  SolicitaCambio.fetchAll(request.params.idCiclo)
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
        matricula: request.session.matricula
      });
    })
    .catch((error) => {
      console.log(error);
      response.render("error.ejs");
    });
};

exports.enviarSolicitud = async (request, response, next) => {
  try {
    const isJson = request.headers["content-type"]?.includes("application/json");
    const datos = isJson ? request.body : request.body;

    const {
      matricula,
      id_materia,
      descripcion,
      tipo,
      nombre_materia
    } = datos;

    let descripcionFinal = "";

    if (tipo === "cambio") {
      descripcionFinal = `El alumno solicita cambiar la materia ${nombre_materia}. Por la materia: ${descripcion}`;
    } else if (tipo === "eliminar") {
      descripcionFinal = `El alumno solicita eliminar la materia ${nombre_materia}. Descripción del cambio: ${descripcion}`;
    } else {
      descripcionFinal = descripcion;
    }

    const idCiclo = request.session.cicloActual || request.params.idCiclo;

    await SolicitaCambio.crearSolicitud({
      matricula,
      id_materia,
      idCiclo,
      descripcion: descripcionFinal,
    });

    if (isJson) {
      return response.status(200).json({ mensaje: "Solicitud enviada correctamente." });
    } else {
      return response.redirect("/enlista/alumno/");
    }
  } catch (error) {
    console.error("Error al guardar la solicitud:", error);
    if (request.headers["content-type"]?.includes("application/json")) {
      return response.status(500).json({ mensaje: "Error interno del servidor" });
    } else {
      return response.status(500).render("error.ejs");
    }
  }
};