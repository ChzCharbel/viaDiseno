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

  static fetchAll(idCicloEscolar, semestre) {
    if (semestre) {
      return db.query(`SELECT * FROM grupos_ciclos_materias
        JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
        JOIN grupos using (id_grupo)
        JOIN grupos_horarios using (id_grupo)
        JOIN profesores using (id_profesor)
        JOIN planes_materias using (id_plan_materia)
        JOIN materias using (id_materia)
        WHERE id_ciclo_escolar = $1::integer AND bloque_semestre = $2::integer AND id_salon IS NOT NULL;`, [idCicloEscolar, semestre]);
    }
    else {
      return db.query(`SELECT * FROM grupos_ciclos_materias
        JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
        JOIN grupos using (id_grupo)
        JOIN grupos_horarios using (id_grupo)
        JOIN profesores using (id_profesor)
        JOIN planes_materias using (id_plan_materia)
        JOIN materias using (id_materia)
        WHERE id_ciclo_escolar = $1::integer AND id_salon IS NOT NULL;`, [idCicloEscolar]);
    }
    
  }

  static async obtenerGruposPorSemestre(semestre, ciclo) {
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
      JOIN grupos_horarios gh ON g.id_grupo = gh.id_grupo
      WHERE bloque_semestre = $1 AND id_ciclo_escolar = $2 AND g.id_salon IS NOT NULL
      ORDER BY g.id_grupo, gh.dia_semana, gh.hora_inicio
    `, [semestre, ciclo]);

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
          inscrito: row.inscrito,
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

  static async asignarSalonGrupoExistente(idGrupo, idSalon) {
    const cupoSalon = await db.query('SELECT capacidad FROM salones WHERE id_salon = $1::integer', [idSalon]);
    return db.query(`UPDATE grupos SET id_salon = $1::integer, cupo_maximo = $2::integer, cupo_disponible = $2::integer WHERE id_grupo = $3::integer`, [idSalon, cupoSalon.rows[0].capacidad, idGrupo]);
  }

};