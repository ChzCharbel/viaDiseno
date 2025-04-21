const db = require("../util/database");

module.exports = class EstadisticasModel {
  // 1. Materias por semestre
  static async getMateriasPorSemestre(idCicloEscolar) {
    try {
      const resultado = await db.query(`
        SELECT pm.semestre, COUNT(*) AS cantidad
        FROM ciclos_escolares_materias cem
        JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
        WHERE cem.id_ciclo_escolar = $1
        GROUP BY pm.semestre
        ORDER BY pm.semestre
      `, [idCicloEscolar]);

      return resultado.rows;
    } catch (error) {
      console.error("Error al obtener materias por semestre:", error);
      return [];
    }
  }

	static async getAlumnosInscritos() {
		const result = await db.query(`
			SELECT inscrito, COUNT(*) AS total
			FROM alumnos
			GROUP BY inscrito
		  `);
		  return result.rows;
	}
  // 2. Alumnos regulares vs irregulares
  static async getRegularesVsIrregulares() {
    try {
      const resultado = await db.query(`
        SELECT 
          regular, 
          COUNT(*) AS cantidad 
        FROM alumnos 
        GROUP BY regular
      `);

      return resultado.rows.map(row => ({
        tipo: row.regular ? "Regular" : "Irregular",
        cantidad: parseInt(row.cantidad)
      }));
    } catch (error) {
      console.error("Error al obtener estadísticas de regularidad:", error);
      return [];
    }
  }
};
