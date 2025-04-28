const HorariosModel = require('../models/horario.model');

exports.guardarHorario = async (req, res) => {
  const { idGrupo } = req.params;
  const id_grupo = parseInt(idGrupo);
  const id_salon = parseInt(req.body.id_salon); // lo tomas del input hidden del formulario
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  try {
    for (let i = 0; i < dias.length; i++) {
      const dia = dias[i];
      const hora_inicio = req.body[`hora_inicio_${i}`];
      const hora_fin = req.body[`hora_fin_${i}`];

      if (hora_inicio && hora_fin && id_salon) {
        const mensaje = await HorariosModel.asignarHorarioAGrupo({
          id_grupo,
          id_salon,
          dia,
          hora_inicio,
          hora_fin
        });

        if (mensaje && mensaje.startsWith('Error')) {
          req.flash('error', mensaje);
          return res.redirect('back');
        }
      }
    }

    req.flash('success', 'Horario asignado correctamente.');
    res.redirect('back');
  } catch (error) {
    console.error('Error al guardar horario:', error);
    req.flash('error', 'Error interno al guardar horario.');
    res.redirect('back');
  }
};