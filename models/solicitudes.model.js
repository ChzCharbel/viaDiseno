const db = require("../util/database");

module.exports = class SolicitaCambio {
  static fetchAll() {
    return db.query(`SELECT * FROM "SolicitaCambio"`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM "SolicitaCambio" WHERE "matricula" = $1::text`,
      [id]
    );
  }
};
