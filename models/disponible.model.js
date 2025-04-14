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
     INSERT INTO "Disponible" ("idCicloEscolar", "matriculaProfesor", lunes, martes, miercoles, jueves, viernes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT ("idCicloEscolar", "matriculaProfesor")
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
    FROM "Disponible"
    WHERE "idCicloEscolar" = $1 AND "matriculaProfesor" = $2
  `;
  
  const result = await pool.query(query, [idCicloEscolar, matriculaProfesor]);
  return result.rows[0] || { lunes: [], martes: [], miercoles: [], jueves: [], viernes: [] };
};

// Función para obtener la disponibilidad de todos los profesores
exports.obtenerTodasDisponibilidades = async (idCicloEscolar) => {
  const query = `
    SELECT "matriculaProfesor", lunes, martes, miercoles, jueves, viernes
    FROM "Disponible"
    WHERE "idCicloEscolar" = $1
  `;
  
  const result = await pool.query(query, [idCicloEscolar]);
  return result.rows;
};