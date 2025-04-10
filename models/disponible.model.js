/*const pool = require("../util/database");
 
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
 };*/