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
            VALUES ($1::text, $2::integer)
        `, [id_alumno, parseInt(id_grupo)]);
    }

    static async getHorariosDeGrupo(id_grupo) {
        try {
            const query = `
                SELECT 
                    grupos_horarios.id_grupo,
                    CASE WHEN LOWER(dia_semana) = 'lunes' THEN hora_inicio ELSE NULL END as lunes_inicio,
                    CASE WHEN LOWER(dia_semana) = 'lunes' THEN hora_fin ELSE NULL END as lunes_fin,
                    CASE WHEN LOWER(dia_semana) = 'martes' THEN hora_inicio ELSE NULL END as martes_inicio,
                    CASE WHEN LOWER(dia_semana) = 'martes' THEN hora_fin ELSE NULL END as martes_fin,
                    CASE WHEN LOWER(dia_semana) = 'miercoles' THEN hora_inicio ELSE NULL END as miercoles_inicio,
                    CASE WHEN LOWER(dia_semana) = 'miercoles' THEN hora_fin ELSE NULL END as miercoles_fin,
                    CASE WHEN LOWER(dia_semana) = 'jueves' THEN hora_inicio ELSE NULL END as jueves_inicio,
                    CASE WHEN LOWER(dia_semana) = 'jueves' THEN hora_fin ELSE NULL END as jueves_fin,
                    CASE WHEN LOWER(dia_semana) = 'viernes' THEN hora_inicio ELSE NULL END as viernes_inicio,
                    CASE WHEN LOWER(dia_semana) = 'viernes' THEN hora_fin ELSE NULL END as viernes_fin
                FROM grupos_horarios
                WHERE id_grupo = $1::integer
            `;
            
            const result = await db.query(query, [parseInt(id_grupo)]);
            
            // Convertir el resultado a un objeto más fácil de usar
            if (result.rows.length > 0) {
                return {
                    id_grupo: id_grupo,
                    lunes_inicio: result.rows[0].lunes_inicio,
                    lunes_fin: result.rows[0].lunes_fin,
                    martes_inicio: result.rows[0].martes_inicio,
                    martes_fin: result.rows[0].martes_fin,
                    miercoles_inicio: result.rows[0].miercoles_inicio,
                    miercoles_fin: result.rows[0].miercoles_fin,
                    jueves_inicio: result.rows[0].jueves_inicio,
                    jueves_fin: result.rows[0].jueves_fin,
                    viernes_inicio: result.rows[0].viernes_inicio,
                    viernes_fin: result.rows[0].viernes_fin
                };
            } else {
                return {
                    id_grupo: id_grupo,
                    lunes_inicio: null, lunes_fin: null,
                    martes_inicio: null, martes_fin: null,
                    miercoles_inicio: null, miercoles_fin: null,
                    jueves_inicio: null, jueves_fin: null,
                    viernes_inicio: null, viernes_fin: null
                };
            }
        } catch (error) {
            console.error('Error al obtener horarios del grupo:', error);
            return {
                id_grupo: id_grupo,
                lunes_inicio: null, lunes_fin: null,
                martes_inicio: null, martes_fin: null,
                miercoles_inicio: null, miercoles_fin: null,
                jueves_inicio: null, jueves_fin: null,
                viernes_inicio: null, viernes_fin: null
            };
        }
    }
}