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
        let consulta = `INSERT INTO ciclos_escolares_materias(id_ciclo_escolar, id_plan_materia) VALUES`;
        let i = 2;
        for (let id of this.idsMaterias) {
            if (id != '') {
                consulta += `($1::integer,$`;
                consulta += (i) + `::integer),`;
                i++;
            }
        }
        consulta = consulta.substring(0,consulta.length-1);
        consulta += ';';
        console.log(consulta);
        const ciclo = [this.idCiclo];
        const parametros = ciclo.concat(this.idsMaterias);
        console.log(parametros);
        return db.query(consulta, parametros);
    }

    static fetchAll(idCicloE, carrera) {
        return db.query(`SELECT * FROM ciclos_escolares_materias cem
            JOIN ciclos_escolares ce using (id_ciclo_escolar)
            JOIN planes_materias pm using (id_plan_materia)
            JOIN materias m using (id_materia)
            JOIN planes_estudios pe using (id_plan_estudio)
            JOIN carreras c using (id_carrera)
            WHERE id_ciclo_escolar = $1::integer  AND carrera = $2::text`, [idCicloE, carrera]);
    }

    static eliminarMateriaPorId(idPlanMateria) {
        return db.query(
            'DELETE FROM ciclos_escolares_materias WHERE id_plan_materia = $1::integer',
            [idPlanMateria]
        );
    }

}