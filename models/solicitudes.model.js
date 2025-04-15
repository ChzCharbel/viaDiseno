const db = require("../util/database");

module.exports = class SolicitaCambio {
  static fetchAll() {
    return db.query(
      `SELECT usuarios.nombre_usuario, usuarios.correo_institucional, solicitudes_cambio.* FROM solicitudes_cambio, usuarios WHERE usuarios.id_ivd = solicitudes_cambio.matricula;`
    );
  }

  static fetchOne(id) {
    return db.query(
      `SELECT u.nombre_usuario, u.correo_institucional, sc.* FROM solicitudes_cambio sc, usuarios u WHERE sc.matricula=$1::text;`,
      [id]
    );
  }
};
