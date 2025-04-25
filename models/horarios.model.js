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
            JOIN ciclos_escolares_materias cem ON gcm.id_cem = cem.id_cem
            JOIN planes_materias pm ON cem.id_pm = pm.id_pm
            WHERE cem.id_ciclo_escolar = $1
        `;
        const [rows] = await db.execute(query, [id_ciclo_escolar]);
        return rows;
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