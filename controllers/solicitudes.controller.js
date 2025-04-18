const SolicitaCambio = require("../models/solicitudes.model");
const { obtenerIdMateriaPorCicloEscolarMateria } = require("../models/solicitudes.model");
const pool = require('../util/database'); 

exports.get_solicitudes = (request, response, next) => {
  SolicitaCambio.fetchAll(request.params.idCiclo)
    .then((solicitudes) => {
      request.session.solicitudes = solicitudes.rows;

      response.render("solicitudes.ejs", {
        csrfToken: request.csrfToken(),
        titulo: "solicitudes",
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || "",
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || "",
        username: request.session.username || "",
        mail: request.session.mail || "",
        rol: request.session.rol || "",
        SolicitaCambio: solicitudes.rows,
        matricula: request.session.matricula,
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
      id_ciclo_escolar_materia,
      nombre_materia
    } = datos;

    if (tipo === "agregar" && !id_ciclo_escolar_materia) {
      throw new Error("No se recibió id_ciclo_escolar_materia");
    }
    

    let id_materia = datos.id_materia;

    if (tipo === "agregar" && id_ciclo_escolar_materia) {
      id_materia = await obtenerIdMateriaPorCicloEscolarMateria(id_ciclo_escolar_materia);
    }


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

exports.actualizarSolicitud = async (req, res) => {
  const { id } = req.params;
  const { estatus, respuesta } = req.body;

  try {
    await SolicitaCambio.actualizarEstatusConRespuesta(id, estatus, respuesta);

    res.json({
      mensaje: 'Actualizado correctamente',
      aprobado: estatus,
      respuesta,
      fecha_resolucion: new Date().toISOString().slice(0, 10)
    });
  } catch (err) {
    console.error('Error al actualizar estatus:', err);
    res.status(500).json({ error: 'Error al actualizar solicitud' });
  }
};


exports.mostrarSolicitudes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM solicitudes ORDER BY fecha_creacion DESC');
    res.render('solicitudes', { solicitudes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las solicitudes');
  }
};
