const db = require("../util/database");

module.exports = class EstadisticasModel {
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
};
