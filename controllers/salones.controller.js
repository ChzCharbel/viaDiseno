const Salones = require('../models/salones.model');

exports.postAsignarSalon = async (req, res) => {
  const { idSalon, idCiclo, diaSemana, horaInicio, horaFin } = req.body;

  try {
    const result = await Salones.verificarDisponibilidad(idSalon, idCiclo, diaSemana, horaInicio, horaFin);

    if (result.rows.length > 0) {
      await Salones.marcarComoOcupado(idSalon, idCiclo, diaSemana, horaInicio, horaFin);
      req.flash('success', '¡Salón asignado correctamente!');
      return res.redirect('/salones/asignar');
    } else {
      req.flash('error', 'El salón no está disponible en ese horario.');
      return res.redirect('/salones/asignar');
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error en el sistema al asignar salón.');
    res.redirect('/salones/asignar');
  }
};