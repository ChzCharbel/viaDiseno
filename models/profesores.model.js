const db = require("../util/database");
const {getAllUsers} = require('../util/admin.api.client');

module.exports = class Profesor {
  static fetchAll() {
    return db.query(`SELECT * FROM profesores WHERE estatus_profesor = 'active'`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM profesores WHERE matricula_profesor = $1::text`,
      [id]
    );
  }

  static async getAllUsers(userType) {
    return await getAllUsers(userType);
  }

  static async sincronizarDesdeAPI() {
    try {
      const profesores = await getAllUsers('Users::Professor');

      for (let profe of profesores) {
        if (profe.status == 'active') {
          const { ivd_id, name, first_surname, second_surname,  status} = profe;
          const idExistente = await db.query(`SELECT * FROM profesores WHERE matricula_profesor = 
            $1::text`, [ivd_id]);
          if (idExistente.rows.length == 0) {
            await db.query(`
            INSERT INTO profesores (matricula_profesor, profesor)
            VALUES ($1::text, $2::text)
          `, [ivd_id, name + ' ' + first_surname + ' ' + second_surname]);
            await db.query(`UPDATE profesores SET estatus_profesor = $1::text WHERE 
              matricula_profesor = $2::text`, [status, ivd_id]);
          }
          else {
            await db.query(`UPDATE profesores SET estatus_profesor = $1::text WHERE 
            matricula_profesor = $2::text`, [status, ivd_id]);
          }
        }
      }
  
      console.log("Profesores sincronizados exitosamente.");
      return { mensaje: "Sincronización completada", total: profesores.length };
      } catch (error) {
        console.error("Error al sincronizar profesores:", error);
        throw error;
      }
  }

  static contarHoras(dias) {
    let diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    const disponibilidad = [];
    const disponibilidadDia = [[],[],[],[],[]];
    const disponibilidadSemana = [];
    console.log(dias.lunes);
    for (let count = 0; count < 5; count++) {
      let horas = '';
      if (diasSemana[count] == 'lunes') {
        horas = dias.lunes;
        console.log('LUNES: ');
      }
      else if (diasSemana[count] == 'martes') {
        horas = dias.martes;
        console.log('MARTES: ');
      }
      else if (diasSemana[count] == 'miercoles') {
        horas = dias.miercoles;
        console.log('MIERCOLES: ');
      }
      else if (diasSemana[count] == 'jueves') {
        horas = dias.jueves;
        console.log('JUEVES: ');
      }
      else if (diasSemana[count] == 'viernes') {
        horas = dias.viernes;
        console.log('VIERNES: ');
      }
      for (let hora of horas) {
          let digitos = hora.slice(0,2).split(':')[0];
          disponibilidadDia[count].push(digitos);
          console.log(digitos);
      }
      count++;
    }
    console.log(disponibilidadDia);
  }

  static fetchDisponibilidad(idProfe, idCicloE) {
    return db.query(`SELECT * FROM profesores_disponibilidad pd JOIN profesores p using 
      (id_profesor) WHERE p.matricula_profesor = $1::text AND 
      id_ciclo_escolar = $2::integer`, [idProfe, idCicloE]);
  }

  static async asignarMateria(id_profesor, id_ciclo_escolar_materia) {
    return db.query(
      `INSERT INTO profesores_materias (id_profesor, id_ciclo_escolar_materia)
       VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [id_profesor, id_ciclo_escolar_materia]
    );
  }
  
  static async eliminarMateriasAsignadas(id_profesor) {
    return db.query(
      `DELETE FROM profesores_materias WHERE id_profesor = $1`,
      [id_profesor]
    );
  }

  static async obtenerMateriasAsignadas(id_profesor, id_ciclo_escolar) {
    try {
      const result = await db.query(`
        SELECT id_ciclo_escolar_materia 
        FROM profesores_materias 
        WHERE id_profesor = $1 AND id_ciclo_escolar_materia IN (
          SELECT id_ciclo_escolar_materia 
          FROM ciclos_escolares_materias 
          WHERE id_ciclo_escolar = $2
        )
      `, [id_profesor, id_ciclo_escolar]);
  
      return result.rows.map(row => row.id_ciclo_escolar_materia);
    } catch (error) {
      console.error('Error al obtener materias asignadas:', error);
      return [];
    }
  }

  static async obtenerDisponibilidad(idMateria, idProfesor, idCiclo) {
    return db.query(`SELECT
      FLOOR(COUNT(*) * 0.5) as total_horas_profesor, 
      (SELECT horas_profesor
      FROM materias m
      WHERE id_materia = $1::integer ),
      FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes') * 0.5) AS total_horas_lunes,
      FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes') * 0.5) AS total_horas_martes,
      FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%') * 0.5) AS total_horas_miercoles,
      FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves') * 0.5) AS total_horas_jueves,
      FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes') * 0.5) AS total_horas_viernes
      FROM profesores_disponibilidad pd
      WHERE id_profesor = $2::integer AND disponible = true AND id_ciclo_escolar = $3::integer;`, [idMateria, idProfesor, idCiclo]);
  }

  static obtenerHorario(idProfesor, idCiclo) {
    return db.query(`SELECT id_profesor, 
    hora_inicio, hora_fin, id_profesor_disponibilidad, dia_semana
    FROM profesores_disponibilidad pd
    WHERE id_profesor = $1::integer AND disponible = true AND id_ciclo_escolar = $2::integer
    GROUP BY id_profesor_disponibilidad
    ORDER BY dia_semana, hora_inicio;`, [idProfesor, idCiclo]);;
  }
  
  
  
  
  
};
