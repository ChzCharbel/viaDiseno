const db = require("../util/database");

module.exports = class Salon {
  static fetchAll() {
    return db.query(`SELECT * FROM public.salones`);
  }

  static fetchOne(id) {
    return db.query(
      `SELECT * FROM salones WHERE id_salon = $1::text`,
      [id]
    );
  }

  // Nueva función: verificar si el salón está disponible
  static verificarDisponibilidad(idSalon, idCiclo, diaSemana, horaInicio, horaFin) {
    return db.query(`
      SELECT * FROM salones_disponibilidad
      WHERE id_salon = $1 AND id_ciclo_escolar = $2
        AND dia_semana = $3
        AND hora_inicio <= $4
        AND hora_fin >= $5
        AND disponible = TRUE
    `, [idSalon, idCiclo, diaSemana, horaInicio, horaFin]);
  }

  // Nueva función: marcar como ocupado
  static marcarComoOcupado(idSalon, idCiclo, diaSemana, horaInicio, horaFin) {
    return db.query(`
      UPDATE salones_disponibilidad
      SET disponible = FALSE
      WHERE id_salon = $1 AND id_ciclo_escolar = $2
        AND dia_semana = $3
        AND hora_inicio <= $4
        AND hora_fin >= $5
    `, [idSalon, idCiclo, diaSemana, horaInicio, horaFin]);
  }

  // Nueva función: llama a la función PL/pgSQL para insertar el horario y actualizar disponibilidad
static crearGrupoCompleto(idSalon, idCiclo, diaSemana, horaInicio, horaFin) {
  return db.query(`
    SELECT crear_grupo_completo(
      $1::INTEGER,
      $2::INTEGER,
      $3::TEXT,
      $4::TIME,
      $5::TIME
    )
  `, [idSalon, idCiclo, diaSemana, horaInicio, horaFin]);
}

};