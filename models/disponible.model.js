const pool = require("../util/database");
 
 exports.guardar = async (data) => {
   const {
     matriculaProfesor,
     idCicloEscolar,
     diaSemana,
     horaInicio,
     horaFin,
     disponible,
   } = data;
 
   // Primero obtenemos el id_profesor usando la matrícula
   const profesorQuery = `SELECT id_profesor FROM profesores WHERE matricula_profesor = $1`;
   const profesorResult = await pool.query(profesorQuery, [matriculaProfesor]);
   
   if (profesorResult.rows.length === 0) {
     throw new Error(`No se encontró ningún profesor con la matrícula ${matriculaProfesor}`);
   }
     const idProfesor = profesorResult.rows[0].id_profesor;     
   
   // Primero, verificamos si ya existe un registro con esta combinación de valores
   const checkExistingQuery = `
     SELECT id_profesor_disponibilidad FROM profesores_disponibilidad 
     WHERE id_profesor = $1 
     AND id_ciclo_escolar = $2 
     AND dia_semana = $3 
     AND hora_inicio = $4 
     AND hora_fin = $5
   `;
   
   const existingResult = await pool.query(checkExistingQuery, [
     idProfesor,
     idCicloEscolar,
     diaSemana,
     horaInicio,
     horaFin
   ]);
   
   let query;
   let params;
   
   if (existingResult.rows.length > 0) {
     // Si ya existe un registro, actualizamos
     query = `
       UPDATE profesores_disponibilidad 
       SET disponible = true
       WHERE id_profesor = $1 
       AND id_ciclo_escolar = $2 
       AND dia_semana = $3 
       AND hora_inicio = $4 
       AND hora_fin = $5
     `;
     
     params = [
       idProfesor,
       idCicloEscolar,
       diaSemana,
       horaInicio,
       horaFin
     ];
   } else {
     // Si no existe, insertamos uno nuevo
     query = `
       INSERT INTO profesores_disponibilidad 
       (id_profesor, id_ciclo_escolar, dia_semana, hora_inicio, hora_fin, disponible)
       VALUES ($1, $2, $3, $4, $5, true)
     `;
     
     params = [
       idProfesor,
       idCicloEscolar,
       diaSemana,
       horaInicio,
       horaFin
     ];
   }
   
   await pool.query(query, params);
 };

// Función para obtener la disponibilidad guardada de un profesor
exports.obtenerDisponibilidad = async (idCicloEscolar, matriculaProfesor) => {
  const query = `
    SELECT pd.dia_semana, pd.hora_inicio
    FROM profesores_disponibilidad pd
    JOIN profesores p using (id_profesor)
    WHERE id_ciclo_escolar = $1 AND matricula_profesor = $2
  `;
  
  const result = await pool.query(query, [idCicloEscolar, matriculaProfesor]);
  
  // Crear objeto de disponibilidad con arrays vacíos para cada día
  const disponibilidad = {
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: []
  };
  
  // Procesar cada fila y agrupar las horas por día
  result.rows.forEach(row => {
    const dia = row.dia_semana.toLowerCase();
    if (disponibilidad[dia]) {
      // Convertir el formato de hora para que coincida con el que espera el frontend
      const hora = row.hora_inicio.substring(0, 5);
      disponibilidad[dia].push(hora);
    }
  });
  
  return disponibilidad;
};

// Función para obtener la disponibilidad de todos los profesores
exports.obtenerTodasDisponibilidades = async (idCicloEscolar) => {
  const query = `
    SELECT *
    FROM profesores_disponibilidad pd
    JOIN profesores p using (id_profesor)
    WHERE id_ciclo_escolar = $1
  `;
  
  const result = await pool.query(query, [idCicloEscolar]);
  return result.rows;
};