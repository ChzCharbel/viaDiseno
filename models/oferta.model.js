const db = require('../util/database');
const Materias = require('./materias.model');

module.exports = class OfertaAcademica {
    constructor(mi_id_ciclo, mis_ids_materias) {
        this.idCiclo = mi_id_ciclo;
        this.idsMaterias = mis_ids_materias;
    }

    save() {
        /* cadena para guardar toda la oferta con una sola 
        consulta */
        let consulta = `INSERT INTO "Ofrece" VALUES`;
        let i = 2;
        for (let id of stringIds) {
            if (id != '') {
                consulta += `($1::text,$`;
                consulta += (i) + `::text),`;
                i++;
            }
        }
        consulta = consulta.substring(0,consulta.length-1);
        consulta += ';';
        console.log(consulta);
        const ciclo = [this.idCiclo];
        const parametros = ciclo.concat(this.idsMaterias);
        console.log(parametros);
        //return db.query(consulta, parametros);
    }

    static fetchAll(idCicloE) {
        return db.query(`SELECT DISTINCT  m.*
        FROM "Materia" m, "Ofrece" o
        WHERE o."idCicloEscolar" = $1::text;`, [idCicloE]);
    }
}