const db = require('../util/database');

async function asignarHorarioAGrupo({ id_grupo, dia, hora_inicio, hora_fin }) {
  const result = await db.query(
    `SELECT asignar_horario_a_grupo($1, $2, $3, $4) AS mensaje`,
    [id_grupo, dia, hora_inicio, hora_fin]
  );
  return result.rows[0].mensaje;
}

module.exports = {
  asignarHorarioAGrupo
};