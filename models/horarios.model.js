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
                    id_grupo,
                    LOWER(dia_semana) as dia_semana,
                    hora_inicio,
                    hora_fin
                FROM grupos_horarios
                WHERE id_grupo = $1::integer
            `;
            
            const result = await db.query(query, [parseInt(id_grupo)]);
            
            const horario = {
                id_grupo: id_grupo,
                lunes_inicio: null, lunes_fin: null,
                martes_inicio: null, martes_fin: null,
                miercoles_inicio: null, miercoles_fin: null,
                jueves_inicio: null, jueves_fin: null,
                viernes_inicio: null, viernes_fin: null
            };

            if (result.rows.length > 0) {
                for (const row of result.rows) {
                    let dia = row.dia_semana.toLowerCase();
                    if (dia === 'miércoles') {
                        dia = 'miercoles';
                    }
                    
                    console.log(`Procesando horario: día=${dia}, inicio=${row.hora_inicio}, fin=${row.hora_fin}`);

                    if (dia === 'lunes') {
                        horario.lunes_inicio = row.hora_inicio;
                        horario.lunes_fin = row.hora_fin;
                    } else if (dia === 'martes') {
                        horario.martes_inicio = row.hora_inicio;
                        horario.martes_fin = row.hora_fin;
                    } else if (dia === 'miercoles') {
                        horario.miercoles_inicio = row.hora_inicio;
                        horario.miercoles_fin = row.hora_fin;
                    } else if (dia === 'jueves') {
                        horario.jueves_inicio = row.hora_inicio;
                        horario.jueves_fin = row.hora_fin;
                    } else if (dia === 'viernes') {
                        horario.viernes_inicio = row.hora_inicio;
                        horario.viernes_fin = row.hora_fin;
                    }
                }
            }
            
            console.log('Horario recuperado para grupo', id_grupo, ':', horario);
            return horario;
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