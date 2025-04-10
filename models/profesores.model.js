const db = require("../util/database");

module.exports = class Profesor {
  static fetchAll() {
    return db.query(`SELECT * FROM "Profesor"`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM "Profesor" WHERE "matriculaProfesor" = $1::text`,
      [id]
    );
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
    return db.query(`SELECT * FROM "Disponible" WHERE "matriculaProfesor" = $1::text AND "idCicloEscolar" = $2::text`, [idProfe, idCicloE]);
  }
};
