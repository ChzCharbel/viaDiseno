const db = require("../util/database");

module.exports = class GrupoHorario {
  static fetchAll() {
    return db.query(`SELECT * FROM grupos_horarios`);
  }
  static async guardarHoras(
    id_grupo,
    id_salon,
    dia_semana,
    hora_inicio,
    hora_fin
  ) {
    console.log(
      "Grupo:" + id_grupo,
      "Salon:" + id_salon,
      "Dia:" + dia_semana,
      "HI:" + hora_inicio,
      "HF:" + hora_fin
    );
    
    const result = await db.query(
      `SELECT asignar_horario_a_grupo($1, $2, $3, $4, $5)`,
      [id_grupo, id_salon, dia_semana, hora_inicio, hora_fin]
    );
    return result.rows[0]?.asignar_horario_a_grupo || null;    
  }
};
