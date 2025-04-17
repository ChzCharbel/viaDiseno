const db = require("../util/database");

module.exports = class GrupoHorario{
    static fetchAll() {
        return db.query(`SELECT * FROM grupos_horarios`);
      }
      static async guardarHoras(id_grupo, dia_semana, hora_inicio, hora_fin) {
        return db.query(
          `INSERT INTO grupos_horarios (id_grupo, dia_semana, hora_inicio, hora_fin)
           VALUES ($1, $2, $3, $4)
           RETURNING id_grupo_horario`, // <- ESTA LÍNEA
          [id_grupo, dia_semana, hora_inicio, hora_fin]
        );
      }
      
      
}