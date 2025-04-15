const db = require('../util/database');

module.exports = class Enlista {
    static obtenerGruposDeAlumno(matricula) {
        return db.query(`
            SELECT 
            g.id_grupo, 
            g.lunes_inicio, g.lunes_fin, 
            g.martes_inicio, g.martes_fin, 
            g.miercoles_inicio, g.miercoles_fin, 
            g.jueves_inicio, g.jueves_fin, 
            g.viernes_inicio, g.viernes_fin,
            m.id_materia, m.nombre_materia AS nombre_materia,
            p.nombre_profesor AS nombre_profesor,
            s.id_salon AS id_salon
            FROM grupos g
            JOIN materias m ON g.id_materia = m.id_materia
            JOIN profesores p ON g.matricula_profesor = p.matricula_profesor
            JOIN salones s ON g.id_salon = s.id_salon
            JOIN enlista e ON g.id_grupo = e.id_grupo
            WHERE e.matricula = $1
        `, [matricula]);
    }    
};