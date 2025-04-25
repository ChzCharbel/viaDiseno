const Grupo = require('../models/grupos.model');
const Profesor = require('../models/profesores.model');
const Salon = require('../models/salones.model');
const Materia = require('../models/materias.model');
const db = require('../util/database'); // <-- importante para usar la función PL/pgSQL

// POST: Verificar o crear grupo (cuando se asigna salón a materia con profesor)
exports.asignarSalonPorMateria = async (req, res) => {
  const { id_materia, id_salon, id_ciclo_escolar, id_profesor } = req.body;

  try {
    // 1. Verificar o crear el grupo
    const id_grupo = await Grupo.verificarOCrearGrupo(
      id_materia,
      id_ciclo_escolar,
      id_profesor,
      id_salon
    );

    console.log("ID de grupo verificado/creado:", id_grupo);

    res.status(200).json({
      mensaje: 'Grupo asignado correctamente',
      id_grupo // <-- se guarda para usarlo en la asignación de horario
    });
  } catch (error) {
    console.error('Error al verificar o crear grupo:', error);
    res.status(500).json({ mensaje: 'Error interno al asignar grupo' });
  }
};

// POST: Asignar horario a grupo
exports.asignarHorarioAGrupo = async (req, res) => {
  const { id_grupo, dia, hora_inicio, hora_fin, id_salon } = req.body;

  try {
    const result = await db.query(
      `SELECT asignar_horario_a_grupo($1, $2, $3, $4, $5) AS mensaje`,
      [id_grupo, dia, hora_inicio, hora_fin, id_salon]
    );

    const mensaje = result.rows[0].mensaje;
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error('Error al asignar horario:', error);
    res.status(500).json({ mensaje: 'Error interno al asignar horario' });
  }
};

// GET: Obtener materias, profesores y salones disponibles
exports.getDatosGrupos = async (req, res) => {
  const idCicloEscolar = req.query.idCiclo || 1;

  try {
    const [materias, profesores, salones] = await Promise.all([
      Materia.getMateriasPorCiclo(idCicloEscolar),
      Profesor.fetchAll(),
      Salon.fetchAll(),
    ]);

    res.json({
      materias,
      profesores: profesores.rows,
      salones: salones.rows
    });
  } catch (error) {
    console.error('Error al obtener datos de grupos:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener datos' });
  }
};