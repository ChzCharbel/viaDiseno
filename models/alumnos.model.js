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

    static async fetchAll() {
		return await db.query(`SELECT * from usuarios JOIN alumnos using (id_ivd) JOIN carreras using(id_carrera)`);
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

	static async eliminarMateria(idIVD, idMateria, idCicloEscolar) {
		const gruposEliminar = await db.query(`SELECT g.id_grupo
			FROM grupos g
			JOIN grupos_ciclos_materias gcm using (id_grupo)
			JOIN ciclos_escolares_materias cem using (id_ciclo_escolar_materia)
			JOIN planes_materias pm using (id_plan_materia)
			JOIN materias m using (id_materia)
			JOIN profesores p using (id_profesor)
			JOIN grupos_horarios gh using (id_grupo)
			JOIN enlista using (id_grupo)
			WHERE id_ivd = $1::text AND id_ciclo_escolar = $2::integer AND id_materia = $3::integer
			ORDER BY g.id_grupo, gh.dia_semana, gh.hora_inicio;`, [idIVD, idCicloEscolar, idMateria]);

		for (let grupo of gruposEliminar.rows) {
			await db.query(`DELETE FROM enlista WHERE id_ivd = $1::text AND id_grupo = $2::integer;`, [idIVD, grupo.id_grupo]);
		}
	}
}
