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
      id_ciclo_escolar,
      tipo,
      mensaje,
      descripcion,
      id_ciclo_escolar_materia // 👈 esto debe coincidir con el name del select en el EJS
    } = datos;

    if (!id_ciclo_escolar_materia) {
      throw new Error("No se recibió id_ciclo_escolar_materia");
    }

    const id_materia = id_ciclo_escolar_materia; 

    console.log("Datos recibidos:", datos); // <-- Agrega esto para depurar

    let descripcionFinal = "";

    if (tipo === "cambio") {
      descripcionFinal = `El alumno solicita cambiar la materia ${nombre_materia}. Por la materia: ${descripcion}`;
    } else if (tipo === "eliminar") {
      descripcionFinal = `El alumno solicita eliminar la materia ${nombre_materia}. Motivo: ${descripcion}`;
    } else if (tipo === "agregar") {
      descripcionFinal = `El alumno solicita agregar la materia seleccionada. Motivo: ${descripcion}`;
    } else {
      descripcionFinal = descripcion;
    }
    

    const idCiclo = request.session.cicloActual || request.params.idCiclo;

    await SolicitaCambio.crearSolicitud({
      id_ivd: matricula,
      id_ciclo_escolar: idCiclo,
      id_materia,
      tipo,
      descripcion: descripcionFinal,
      mensaje: "" // Se queda vacío para que el admin lo llene después
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