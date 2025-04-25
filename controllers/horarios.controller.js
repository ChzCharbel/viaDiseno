const HorarioModel = require('../models/horarios.model');
const AlumnosModel = require('../models/alumnos.model');

function hayEmpalme(horarios, nuevo) {
  for (const existente of horarios) {
    for (const dia of ["lunes", "martes", "miercoles", "jueves", "viernes"]) {
      const ini1 = existente[`${dia}_inicio`];
      const fin1 = existente[`${dia}_fin`];
      const ini2 = nuevo[`${dia}_inicio`];
      const fin2 = nuevo[`${dia}_fin`];

      if (ini1 && fin1 && ini2 && fin2) {
        if (ini1 < fin2 && ini2 < fin1) {
          return true;
        }
      }
    }
  }
  return false;
}

exports.generarHorariosParaTodos = async (req, res) => {
  const { id_ciclo_escolar } = req.body;

  try {
    const alumnosResult = await AlumnosModel.fetchAll();
    const gruposDisponibles = await HorarioModel.obtenerGruposOfertados(id_ciclo_escolar);

    // Aseguramos que alumnos sea un array (tomando las filas del resultado)
    const alumnos = alumnosResult.rows || [];
    
    console.log(`Procesando ${alumnos.length} alumnos`);
    
    let totalInscritos = 0;
    const resumen = [];

    for (const alumno of alumnos) {
      try {
        const historialResult = await HorarioModel.obtenerHistorialAcademico(alumno.id_ivd);
        console.log(`Historial para ${alumno.id_ivd}:`, typeof historialResult);
        
        // Si hay error o no es un array, registramos el problema y continuamos con el siguiente alumno
        if (!historialResult || historialResult.error || !Array.isArray(historialResult)) {
          console.log(`No se pudo obtener historial académico para ${alumno.id_ivd}: ${JSON.stringify(historialResult)}`);
          resumen.push({
            id_ivd: alumno.id_ivd,
            nombre: alumno.nombre_usuario || alumno.nombre || 'Desconocido',
            regular: alumno.regular ? "regular" : "irregular",
            materias_inscritas: 0,
            error: "No se pudo obtener historial académico"
          });
          continue;
        }
        
        // Ahora estamos seguros de que historialResult es un array
        const idsCursadas = historialResult.map(m => m.course_id);

        const materiasNoCursadas = gruposDisponibles.filter(
          g => !idsCursadas.includes(g.id_materia)
        );

        console.log(`Materias no cursadas para ${alumno.id_ivd}:`, materiasNoCursadas.length);

        let materiasElegidas = [];
        const horariosAsignados = [];

        if (alumno.regular === true) {
          const actuales = materiasNoCursadas.filter(g => g.semestre == alumno.semestre);
          materiasElegidas.push(...actuales.slice(0, 7));

          const restantes = materiasNoCursadas.filter(g => g.semestre != alumno.semestre);
          restantes.sort((a, b) => a.semestre - b.semestre);

          for (const g of restantes) {
            if (materiasElegidas.length < 7) {
              materiasElegidas.push(g);
            } else break;
          }
        } else {
          const ordenadas = materiasNoCursadas
            .filter(g => g.semestre <= alumno.semestre)
            .sort((a, b) => a.semestre - b.semestre);

          for (const g of ordenadas) {
            if (materiasElegidas.length >= 7) break;
            const horarioGrupo = await HorarioModel.getHorariosDeGrupo(g.id_grupo);
            if (!hayEmpalme(horariosAsignados, horarioGrupo)) {
              materiasElegidas.push(g);
              horariosAsignados.push(horarioGrupo);
            }
          }
        }        // Inscribir al alumno en las materias elegidas
        for (const g of materiasElegidas) {
          try {
            await HorarioModel.inscribirMateria(alumno.id_ivd, g.id_grupo);
          } catch (inscripcionError) {
            console.error(`Error al inscribir materia ${g.id_grupo} para alumno ${alumno.id_ivd}:`, inscripcionError);
          }
        }
        
        resumen.push({
          id_ivd: alumno.id_ivd,
          nombre: alumno.nombre_usuario || alumno.nombre || 'Desconocido',
          regular: typeof alumno.regular === 'boolean' ? (alumno.regular ? "regular" : "irregular") : (alumno.regular === 'true' ? "regular" : "irregular"),
          materias_inscritas: materiasElegidas.length
        });

        totalInscritos++;
      } catch (alumnoError) {
        console.error(`Error procesando alumno ${alumno.id_ivd}:`, alumnoError);
        resumen.push({
          id_ivd: alumno.id_ivd,
          nombre: alumno.nombre_usuario || alumno.nombre || 'Desconocido',
          error: alumnoError.message
        });
      }
    }

    res.status(200).json({
      message: `Horarios generados para ${totalInscritos} alumnos.`,
      detalle: resumen
    });

  } catch (err) {
    console.error("Error al generar horarios:", err);
    res.status(500).json({ error: "Hubo un problema al generar los horarios." });
  }
};