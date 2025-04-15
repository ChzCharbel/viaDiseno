const db = require("../util/database");

module.exports = class Salon {
  static fetchAll() {
    return db.query(`SELECT * FROM salones`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM salones WHERE id_salon = $1::text`,
      [id]
    );
  }
};