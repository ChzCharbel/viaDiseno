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

  

  static async crearSolicitud({ id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje }) {
    const query = `
      INSERT INTO solicitudes_cambio
      (id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje, fecha_solicitud, aprobado, resuelto)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, null, false)
    `;
    const values = [id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje];
    return db.query(query, values);
  }
  
  
};


