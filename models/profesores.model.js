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
          console.log('PROFESOR: ' + idExistente.rows.length);
          if (idExistente.rows.length == 0) {
            console.log('no estaba en la tabla')
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
      (id_profesor) JOIN ciclos_escolares ce using (id_ciclo_escolar) WHERE p.matricula_profesor = $1::text AND 
      ce.ciclo_escolar = $2::text`, [idProfe, idCicloE]);
  }
};
