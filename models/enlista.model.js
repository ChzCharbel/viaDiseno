const db = require('../util/database');

module.exports = class Enlista {
    static obtenerGruposDeAlumno(matricula) {
        return db.query(`
            SELECT 
            g."idGrupo", 
            g."lunesInicio", g."lunesFin", 
            g."martesInicio", g."martesFin", 
            g."miercolesInicio", g."miercolesFin", 
            g."juevesInicio", g."juevesFin", 
            g."viernesInicio", g."viernesFin",
            m."idMateria", m."nombreMateria" AS "nombreMateria",
            p."nombreProfesor" AS "nombreProfesor",
            s."idSalon" AS "idSalon"
            FROM "Grupo" g
            JOIN "Materia" m ON g."idMateria" = m."idMateria"
            JOIN "Profesor" p ON g."matriculaProfesor" = p."matriculaProfesor"
            JOIN "Salon" s ON g."idSalon" = s."idSalon"
            JOIN "Enlista" e ON g."idGrupo" = e."idGrupo"
            WHERE e."matricula" = $1
        `, [matricula]);
    }    
};