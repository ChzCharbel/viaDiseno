const db = require('../util/database');

module.exports = class Alumno {
    static fetchAll() {
		return db.query(`SELECT * from usuarios JOIN alumnos using (id_ivd) JOIN carreras using(id_carrera)`);
	}
	static fetchOne(id){
		return db.query(`SELECT * from usuarios u JOIN alumnos using(id_ivd) JOIN carreras using(id_carrera)
			WHERE u.id_ivd = $1::text`, [id]);
	}

	static find(nombreUsuario) {
        return db.query(
            `SELECT * from usuarios u JOIN alumnos using(id_ivd) JOIN carreras using(id_carrera)
			WHERE u.nombre_usuario LIKE $1::text`,
            ['%' + nombreUsuario + '%']);
    }
}
