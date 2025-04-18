const EnlistaModel = require('../models/enlista.model');
const Grupo = require('../models/materias.model');

exports.get_enlista = async (req, res, next) => {
  const matricula = req.session.matricula;
  const ciclo = req.params.idCiclo || req.session.cicloActual;

  if (!matricula) {
    return res.status(401).send('Sesión no iniciada.');
  }

  try {
    const grupos = await EnlistaModel.obtenerGruposDeAlumno(matricula);
    console.log("ID del ciclo usado:", ciclo);

    const materiasDisponibles = await Grupo.getMateriasPorCiclo(ciclo);
    console.log("Materias disponibles:", materiasDisponibles);

    res.render('horario_alumnos_regulares', {
      grupos,
      titulo: 'Horario de Clases',
      privilegios: req.session.privilegios || [],
      carrera: req.session.carrera || '',
      ciclosEscolares: req.session.ciclosEscolares || [],
      cicloActual: ciclo,
      username: req.session.username || '',
      mail: req.session.mail || '',
      rol: req.session.rol || '',
      matricula,
      csrfToken: req.csrfToken(),
      materiasDisponibles
    });
  } catch (err) {
    console.error('Error al obtener grupos o materias:', err);
    res.status(500).send('Error interno al cargar datos del alumno');
  }
};

