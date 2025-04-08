const db = require("../util/database");

module.exports = class Salon {
  static fetchAll() {
    return db.query(`SELECT * FROM "Salon"`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM "Salon" WHERE "idSalon" = $1::text`,
      [id]
    );
  }
};