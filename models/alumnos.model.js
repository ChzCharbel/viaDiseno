const db = require('../util/database');

module.exports = class Alumno {
    static fetchAll() {
		return db.query(`SELECT * from usuarios JOIN alumnos using (id_ivd)`);/* u.nombre_usuario, a.matricula, a.carrera, a.regular, a.semestre
    FROM alumnos a, usuarios u WHERE a.matricula = u.id_ivd;`);*/
	}
	static fetchOne(id){
		return db.query(`SELECT * from usuarios u JOIN alumnos using(id_ivd) WHERE u.id_ivd = $1::text`, [id]);
	}

	static find(nombreUsuario) {
        return db.query(
            `SELECT * from usuarios u JOIN alumnos using(id_ivd)
			WHERE u.nombre_usuario LIKE $1::text`,
            ['%' + nombreUsuario + '%']);
    }
}
