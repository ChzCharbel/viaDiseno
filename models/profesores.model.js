const db = require("../util/database");

module.exports = class Profesor {
  static fetchAll() {
    return db.query(`SELECT * FROM "Profesor"`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM "Profesor" WHERE "matriculaProfesor" = $1::text`,
      [id]
    );
  }
};
