const db = require('../util/database');

module.exports = class Grupo {

  static async obtenerGrupoPorMateria(idMateria, idCicloEscolar) {
    const query = `
      SELECT g.id_grupo
      FROM grupos g
      JOIN grupos_ciclos_materias gcm ON g.id_grupo = gcm.id_grupo
      JOIN ciclos_escolares_materias cem ON gcm.id_ciclo_escolar_materia = cem.id_ciclo_escolar_materia
      JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
      WHERE pm.id_materia = $1
        AND cem.id_ciclo_escolar = $2
      LIMIT 1;
    `;

    return db.query(query, [idMateria, idCicloEscolar]);
  }

  static async asignarSalon(idGrupo, idSalon) {
    const query = `
      UPDATE grupos
      SET id_salon = $1
      WHERE id_grupo = $2;
    `;

    return db.query(query, [idSalon, idGrupo]);
  }

  static async verificarOCrearGrupo(idMateria, idCicloEscolar, idProfesor, idSalon) {
    const query = `
      SELECT verificar_o_crear_grupo($1, $2, $3, $4)
    `;
    const values = [idMateria, idCicloEscolar, idProfesor, idSalon];
    return db.query(query, values);
  }

};