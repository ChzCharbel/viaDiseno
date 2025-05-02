const db = require('../util/database');

module.exports = class Enlista {
  static async obtenerGruposDeAlumno(id_ivd) {
    const result = await db.query(`
      SELECT 
        g.id_grupo,
        m.id_materia,
        m.materia AS nombre_materia,
        p.profesor AS nombre_profesor,
        COALESCE(s.id_salon, 99) as id_salon,
        gh.dia_semana,
        gh.hora_inicio,
        gh.hora_fin
      FROM grupos g
      JOIN grupos_ciclos_materias gcm ON g.id_grupo = gcm.id_grupo
      JOIN ciclos_escolares_materias cem ON gcm.id_ciclo_escolar_materia = cem.id_ciclo_escolar_materia
      JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
      JOIN materias m ON pm.id_materia = m.id_materia
      JOIN profesores p ON g.id_profesor = p.id_profesor
      LEFT JOIN salones s ON g.id_salon = s.id_salon
      JOIN enlista e ON g.id_grupo = e.id_grupo
      JOIN grupos_horarios gh ON g.id_grupo = gh.id_grupo
      WHERE e.id_ivd = $1
      ORDER BY g.id_grupo, gh.dia_semana, gh.hora_inicio
    `, [id_ivd]);

    const rows = result.rows;
    const gruposAgrupados = {};

    rows.forEach(row => {
      const id = row.id_grupo;

      if (!gruposAgrupados[id]) {
        gruposAgrupados[id] = {
          idGrupo: id,
          materia: {
            id: row.id_materia,
            nombre: row.nombre_materia
          },
          profesor: {
            nombre: row.nombre_profesor
          },
          salon: {
            id: row.id_salon
          },
          horarios: []
        };
      }

      const yaExiste = gruposAgrupados[id].horarios.some(h =>
        h.dia === row.dia_semana &&
        h.hora_inicio === row.hora_inicio &&
        h.hora_fin === row.hora_fin
      );

      if (!yaExiste) {
        gruposAgrupados[id].horarios.push({
          dia: row.dia_semana,
          hora_inicio: row.hora_inicio,
          hora_fin: row.hora_fin
        });
      }
    });

    return Object.values(gruposAgrupados);
  }
};