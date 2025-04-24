const db = require("../util/database");

module.exports = class GrupoHorario {
  static fetchAll() {
    return db.query(`SELECT * FROM grupos_horarios`);
  }

  static async guardarHoras(
    id_salon,
    id_ciclo_escolar_materia,
    dia_semana,
    hora_inicio,
    hora_fin
  ) {
    console.log(
      "Salon:" + id_salon,
      "Ciclo:" + id_ciclo_escolar_materia,
      "Dia:" + dia_semana,
      "HI:" + hora_inicio,
      "HF" + hora_fin
    );
    const result = await db.query(
      `SELECT crear_grupo_completo($1, $2, $3, $4, $5) AS id_grupo`,
      [id_salon, id_ciclo_escolar_materia, dia_semana, hora_inicio, hora_fin]
    );
    return result.rows[0].id_grupo;
  }
};
