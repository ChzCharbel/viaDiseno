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
    const alumnos = await AlumnosModel.fetchAll();
    const gruposDisponibles = await HorarioModel.pbtenerGruposOfertados(id_ciclo_escolar);

    let totalInscritos = 0;
    const resumen = [];

    for (const alumno of alumnos) {
      const historial = await HorarioModel.obtenerHistorialAcademico(alumno.ivd_id);
      const idsCursadas = historial.map(m => m.course_id);

      const materiasNoCursadas = gruposDisponibles.filter(
        g => !idsCursadas.includes(g.id_materia)
      );

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
      }

      for (const g of materiasElegidas) {
        await HorarioModel.inscribirMateria(alumno.id_ivd, g.id_grupo);
      }

      resumen.push({
        id_ivd: alumno.id_ivd,
        nombre: alumno.nombre_usuario,
        regular: alumno.regular ? "regular" : "irregular",
        materias_inscritas: materiasElegidas.length
      });

      totalInscritos++;
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