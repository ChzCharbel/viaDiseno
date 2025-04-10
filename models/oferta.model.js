const db = require('../util/database');
const Materias = require('./materias.model');

module.exports = class OfertaAcademica {
    constructor(mi_id_ciclo, mi_id_materia) {
        this.idCiclo = mi_id_ciclo;
        this.idMateria = mi_id_materia;
    }

    static fetchAll(idCicloE) {
        return db.query(`SELECT DISTINCT  m.*
        FROM "Materia" m, "Ofrece" o
        WHERE o."idCicloEscolar" = $1::text;`, [idCicloE]);
    }
}