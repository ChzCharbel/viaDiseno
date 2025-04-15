const pool = require("../util/database");
 
 exports.guardar = async (data) => {
   const {
     idCicloEscolar,
     matriculaProfesor,
     lunes,
     martes,
     miercoles,
     jueves,
     viernes
   } = data;
 
   const toPGArray = (arr) => `{${arr.join(",")}}`;

   const query = `
     INSERT INTO disponible (id_ciclo_escolar, matricula_profesor, lunes, martes, miercoles, jueves, viernes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id_ciclo_escolar, matricula_profesor)
     DO UPDATE SET
       lunes = EXCLUDED.lunes,
       martes = EXCLUDED.martes,
       miercoles = EXCLUDED.miercoles,
       jueves = EXCLUDED.jueves,
       viernes = EXCLUDED.viernes
   `;
 
   await pool.query(query, [
     idCicloEscolar,
     matriculaProfesor,
     toPGArray(lunes),
     toPGArray(martes),
     toPGArray(miercoles),
     toPGArray(jueves),
     toPGArray(viernes)
   ]);
 };

// Función para obtener la disponibilidad guardada de un profesor
exports.obtenerDisponibilidad = async (idCicloEscolar, matriculaProfesor) => {
  const query = `
    SELECT lunes, martes, miercoles, jueves, viernes
    FROM disponible
    WHERE id_ciclo_escolar = $1 AND matricula_profesor = $2
  `;
  
  const result = await pool.query(query, [idCicloEscolar, matriculaProfesor]);
  return result.rows[0] || { lunes: [], martes: [], miercoles: [], jueves: [], viernes: [] };
};

// Función para obtener la disponibilidad de todos los profesores
exports.obtenerTodasDisponibilidades = async (idCicloEscolar) => {
  const query = `
    SELECT matricula_profesor, lunes, martes, miercoles, jueves, viernes
    FROM disponible
    WHERE id_ciclo_escolar = $1
  `;
  
  const result = await pool.query(query, [idCicloEscolar]);
  return result.rows;
};