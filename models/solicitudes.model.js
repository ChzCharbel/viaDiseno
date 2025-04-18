const db = require("../util/database");

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

  static crearSolicitud ({ matricula, id_materia, descripcion, idCiclo}) {
    const fecha_solicitud = new Date().toISOString().split('T')[0];

    return db.query(
      `INSERT INTO solicitudes_cambio
      (id_ivd, id_materia, id_ciclo_escolar, resuelto, descripcion, fecha_solicitud, fecha_resolucion)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [matricula, id_materia, idCiclo, null, descripcion, fecha_solicitud, null]
    );
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


