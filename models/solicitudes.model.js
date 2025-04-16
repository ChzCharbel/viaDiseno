const db = require("../util/database");

module.exports = class SolicitaCambio {
  static fetchAll() {
    return db.query(
      `SELECT * FROM solicitudes_cambio sc JOIN usuarios u using(id_ivd) JOIN alumnos a using(id_ivd);`
    );
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM solicitudes_cambio sc JOIN usuarios u using(id_ivd) JOIN alumnos a using(id_ivd) WHERE sc.id_ivd = $1::text;`,
      [id]
    );
  }

  static crearSolicitud ({ matricula, id_materia, descripcion}) {
    const fecha_solicitud = new Date().toISOString().split('T')[0];

    return db.query(
      `INSERT INTO solicitudes_cambio
      (id_ivd, id_materia, resuelto, descripcion, fecha_solicitud, fecha_resolucion)
      VALUES ($1, $2, $3, $4, $5, $6);`,
      [matricula, id_materia, null, descripcion, fecha_solicitud, null]
    );
  }
};
