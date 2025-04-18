const db = require("../util/database");


const obtenerIdMateriaPorCicloEscolarMateria = async (idCicloEscolarMateria) => {
  try {
    const result = await db.query(`
      SELECT pm.id_materia
      FROM ciclos_escolares_materias cem
      JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
      WHERE cem.id_ciclo_escolar_materia = $1
    `, [idCicloEscolarMateria]);

    if (result.rows.length > 0) {
      return result.rows[0].id_materia;
    } else {
      throw new Error("No se encontró el id_materia relacionado.");
    }
  } catch (error) {
    console.error("Error en obtenerIdMateriaPorCicloEscolarMateria:", error);
    throw error;
  }
};


module.exports = class SolicitaCambio {
  static fetchAll(idCiclo) {
    return db.query(
      `SELECT * FROM solicitudes_cambio sc JOIN usuarios u using(id_ivd) JOIN alumnos a using(id_ivd) 
      WHERE id_ciclo_escolar = $1::integer;`, [idCiclo]
    );
  }

  static fetchOne(matricula, idCiclo) {
    return db.query(
      `SELECT * FROM solicitudes_cambio sc JOIN usuarios u using(id_ivd) JOIN alumnos a using(id_ivd) 
      WHERE sc.id_ivd = $1::text AND id_ciclo_escolar = $2::integer;`,
      [matricula, idCiclo]
    );
  }

  

  static async crearSolicitud({ id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje }) {
    const query = `
      INSERT INTO solicitudes_cambio
      (id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje, fecha_solicitud, aprobado, resuelto)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, null, false)
    `;
    const values = [id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje];
    return db.query(query, values);
  }
  
  

  static actualizarEstatus(idSolicitud, aprobado, fechaResolucion) {
    return db.query(
      `UPDATE solicitudes_cambio
       SET aprobado = $1, fecha_resolucion = $2
       WHERE id_solicitud = $3;`,
      [aprobado, fechaResolucion, idSolicitud]
    );
  }

  static actualizarEstatusConRespuesta(idSolicitud, aprobado, respuesta) {
    return db.query(
      `UPDATE solicitudes_cambio
       SET aprobado = $1, mensaje = $2, fecha_resolucion = NOW()
       WHERE id_solicitud = $3;`,
      [aprobado, respuesta, idSolicitud]
    );
  }
  
};
module.exports.obtenerIdMateriaPorCicloEscolarMateria = obtenerIdMateriaPorCicloEscolarMateria;





