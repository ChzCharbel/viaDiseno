const db = require("../util/database");

module.exports = class GrupoHorario{
    static fetchAll() {
        return db.query(`SELECT * FROM grupos_horarios`);
      }
}