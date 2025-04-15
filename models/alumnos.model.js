const db = require('../util/database');

module.exports = class Alumno {
    static fetchAll() {
		return db.query(`SELECT u.nombre_usuario, a.matricula, a.carrera, a.regular, a.semestre
    FROM alumnos a, usuarios u WHERE a.matricula = u.id_ivd;`);
	}
	static fetchOne(id){
		return db.query(`SELECT u.nombre_usuario, a.matricula, a.carrera, a.regular, a.semestre
    FROM alumnos a, usuarios u WHERE a.matricula = u.id_ivd AND a.matricula = $1::text`, [id]);
	}

	static find(nombreUsuario) {
        return db.query(
            `SELECT u.nombre_usuario, a.matricula, a.carrera, a.regular, a.semestre
			FROM usuarios u, alumnos a
			WHERE a.matricula = u.id_ivd AND u.nombre_usuario LIKE $1::text`,
            ['%' + nombreUsuario + '%']);
    }
}
