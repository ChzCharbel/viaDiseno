const db = require('../util/database');
const {getAllUsers} = require('../util/admin.api.client');

module.exports = class Alumno {

	static async getAllUsers() {
		return await getAllUsers('Users::Student');
	}

	static async sincronizarDesdeAPI() {
		try {
			const alumnos = await this.getAllUsers();
			for (let alumno of alumnos) {
				if (alumno.status == 'active' && alumno.degree_id) {
					const { ivd_id, name, first_surname, 
						second_surname, email, status, 
						semester, degree_name, regular
					} = alumno;
					await db.query(`
						CALL sincronizar_alumnos($1::text, 
						$2::text, 
						$3::text, 
						$4::text, 
						$5::boolean, 
						$6::text, 
						$7::text);
					`, [ivd_id, name + ' ' + first_surname + ' ' + 
						second_surname, email, degree_name, regular, semester, status]);
				}
			}
		}
		catch (error) {
			console.error("Error al sincronizar alumnos:", error);
            throw error;
		}
	}

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
