const db = require('../util/database');
const { getAllCourses, getAllDegrees } = require('../util/admin.api.client');

module.exports = class Materia {
  static async getAllCourses() {
    return await getAllCourses();
  }

  static async getAllDegrees() {
    return await getAllDegrees();
  }

  // Filtra las materias por la carrera que reciba como parámetro
  static async fetchByDegree(carrera) {
    return this.getAllCourses().then((materias) => {
      const arregloMaterias = [];
      for (let materia of materias) {
        if (materia.plans[0].degree.name == carrera) {
          arregloMaterias.push(materia);
        }
      }
      return arregloMaterias;
    }).catch((error) => {
      console.log(error);
    });
  }

  // Filtra los planes de estudio por carrera
  static async fetchPlanesByDegree(carrera) {
    return this.getAllDegrees().then((planes) => {
      const arregloPlanes = [];
      for (let plan of planes) {
        if (plan.name == carrera) {
          const activos = plan.plans.filter(p => p.status === 'active');
          if (activos.length > 0) {
            arregloPlanes.push(...activos);
          } else {
            arregloPlanes.push(plan.plans[0]);
          }
        }
      }
      return arregloPlanes;
    }).catch((error) => {
      console.log(error);
    });
  }

  static async sincronizarDesdeAPI() {
    try {
      const materias = await getAllCourses();
      for (let materia of materias) {
        if (materia.plans[0].degree.status == 'active') {
          const estatus = materia.plans[0].degree.status;
          const { id, name, credits, hours_professor } = materia;

          await db.query(`
            INSERT INTO materias (id_materia, materia, creditos, horas_profesor)
            VALUES ($1::text, $2::text, $3::integer, $4::integer)
            ON CONFLICT (id_materia) DO NOTHING
          `, [id, name, parseInt(credits), hours_professor]);

          await db.query(`
            UPDATE materias SET estatus = $1::text
            WHERE id_materia = $2::text
          `, [estatus, id]);
        }
      }

      console.log("Materias sincronizadas exitosamente.");
      return { mensaje: "Sincronización completada", total: materias.length };
    } catch (error) {
      console.error("Error al sincronizar materias:", error);
      throw error;
    }
  }

  static async sincronizarPlanesDesdeAPI() {
    try {
      const planes = await getAllCourses();
      for (let plan of planes) {
        if (plan.plans[0].degree.status === 'active') {
          const estatus = plan.plans[0].degree.status;
          const { id, name, credits, hours_professor } = plan;
          const carrera = plan.plans[0].degree.name;

          const carreraQuery = await db.query(
            `SELECT id_carrera FROM carreras WHERE carrera LIKE $1::text`,
            [carrera]
          );

          const idCarrera = carreraQuery.rows[0]?.id_carrera;
          if (!idCarrera) continue;

          await db.query(`
            INSERT INTO planes_estudios (id_plan, plan_estudio, id_carrera)
            VALUES ($1::text, $2::text, $3::integer)
            ON CONFLICT (id_plan) DO NOTHING
          `, [id, name, idCarrera]);

          await db.query(`
            UPDATE materias SET estatus = $1::text
            WHERE id_materia = $2::text
          `, [estatus, id]);
        }
      }

      console.log("Planes sincronizados exitosamente.");
      return { mensaje: "Sincronización completada", total: planes.length };
    } catch (error) {
      console.error("Error al sincronizar planes:", error);
      throw error;
    }
  }

  // Trae las materias del ciclo (sin profesor)
  static async getMateriasPorCiclo(idCicloEscolar) {
    try {
      const resultado = await db.query(`
        SELECT cem.id_ciclo_escolar_materia, m.materia AS nombre_materia
        FROM ciclos_escolares_materias cem
        JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
        JOIN materias m ON pm.id_materia = m.id_materia
        WHERE pm.estatus_plan_materia = 'active'
          AND cem.id_ciclo_escolar = $1
        ORDER BY m.materia ASC
      `, [idCicloEscolar]);

      return resultado.rows;
    } catch (error) {
      console.error("Error al obtener materias del ciclo actual:", error);
      return [];
    }
  }

  // Trae las materias del ciclo con su profesor correspondiente
  static async getMateriasConProfesorPorCiclo(idCicloEscolar) {
    try {
      const resultado = await db.query(`
        SELECT
          m.materia AS nombre_materia,
          p.profesor AS profesor,
          pm.id_profesor_materia,
          p.id_profesor,
          m.id_materia,
          cem.id_ciclo_escolar_materia,
          g.id_grupo AS id
        FROM profesores_materias pm
        JOIN profesores p ON p.id_profesor = pm.id_profesor
        JOIN ciclos_escolares_materias cem ON cem.id_ciclo_escolar_materia = pm.id_ciclo_escolar_materia
        JOIN planes_materias plm ON plm.id_plan_materia = cem.id_plan_materia
        JOIN materias m ON m.id_materia = plm.id_materia
        LEFT JOIN grupos_ciclos_materias gcm ON gcm.id_ciclo_escolar_materia = cem.id_ciclo_escolar_materia
        LEFT JOIN grupos g ON gcm.id_grupo = g.id_grupo
        WHERE cem.id_ciclo_escolar = $1
        ORDER BY m.materia ASC
      `, [idCicloEscolar]);
  
      return resultado.rows;
    } catch (error) {
      console.error("Error al obtener materias con profesor:", error);
      return [];
    }
  }    
};