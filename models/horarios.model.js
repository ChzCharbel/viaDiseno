const db = require('../util/database.js')
const { getAcademicHistory } = require('../util/admin.api.client.js')

module.exports = class Horario {

    static async obtenerGruposOfertados(id_ciclo_escolar) {
        const query = `
             SELECT 
            gcm.id_grupo,
            pm.id_materia,
            pm.semestre
            FROM grupos_ciclos_materias gcm
            JOIN ciclos_escolares_materias cem ON gcm.id_ciclo_escolar_materia = cem.id_ciclo_escolar_materia
            JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
            WHERE cem.id_ciclo_escolar = $1
        `;
        const result = await db.query(query, [id_ciclo_escolar]);
        return result.rows;
    }

    static async obtenerHistorialAcademico(id_alumno) {
        return await getAcademicHistory(id_alumno);
    }

    static async inscribirMateria(id_alumno, id_grupo) {
        return await db.query(`
            INSERT INTO enlista (id_ivd, id_grupo)
            VALUES ($1::text, $2::text)
        `, [id_alumno, id_grupo]);
    }
}