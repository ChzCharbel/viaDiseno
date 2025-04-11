const db = require("../util/database");

module.exports = class SolicitaCambio {
  static fetchAll() {
    return db.query(
      `SELECT "Usuario"."nombreUsuario", "Usuario"."correoInstitucional", "SolicitaCambio".* FROM "SolicitaCambio", "Usuario" WHERE "Usuario"."idIVD" = "SolicitaCambio".matricula;`
    );
  }

  static fetchOne(id) {
    return db.query(
      `SELECT u."nombreUsuario", u."correoInstitucional", sc.* FROM "SolicitaCambio" sc, "Usuario" u WHERE sc.matricula = $1::text;`,
      [id]
    );
  }
};
