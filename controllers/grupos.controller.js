const Grupo = require('../models/grupos.model');
const Profesor = require('../models/profesores.model');
const Salon = require('../models/salones.model');
const Materia = require('../models/materias.model');

//POST: Asignar salón a una materia (indirectamente al grupo asociado)
exports.asignarSalonPorMateria = async (req, res) => {
  const { id_materia, id_salon, id_ciclo_escolar } = req.body;

  try {
    // Buscar el grupo asociado a la materia en ese ciclo
    const grupo = await Grupo.obtenerGrupoPorMateria(id_materia, id_ciclo_escolar);

    if (grupo.rowCount === 0) {
      return res.status(404).json({ mensaje: 'No se encontró grupo para esa materia' });
    }

    const id_grupo = grupo.rows[0].id_grupo;

    // Actualizar el grupo con el salón seleccionado
    await Grupo.asignarSalon(id_grupo, id_salon);

    res.status(200).json({ mensaje: 'Salón asignado correctamente' });
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