const Grupo = require('../models/grupos.model');
const Profesor = require('../models/profesores.model');
const Salon = require('../models/salones.model');
const Materia = require('../models/materias.model');

//POST: Asignar salón a una materia (indirectamente al grupo asociado)
exports.asignarSalonPorMateria = async (req, res) => {
  const { id_materia, id_salon, id_ciclo_escolar, id_profesor } = req.body;

  try {
    // Usar la función que crea o reutiliza un grupo
    const result = await Grupo.verificarOCrearGrupo(id_materia, id_ciclo_escolar, id_profesor, id_salon);

    const id_grupo = result.rows[0].verificar_o_crear_grupo;

    res.status(200).json({
      mensaje: 'Salón asignado correctamente (grupo creado o reutilizado)',
      id_grupo
    });
  } catch (error) {
    console.error('Error al asignar salón:', error);
    res.status(500).json({ mensaje: 'Error interno al asignar salón' });
  }
};

//GET: Cargar datos iniciales (materias, profesores, salones)
exports.getDatosGrupos = async (req, res) => {
  const idCicloEscolar = req.query.idCiclo || 1;

  try {
    const [materias, profesores, salones] = await Promise.all([
      Grupo.getMateriasConProfesorPorCiclo(idCicloEscolar), 
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