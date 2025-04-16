const db = require('../util/database');

module.exports = class CicloEscolar {
  constructor(mi_id, mi_fecha_inicio, mi_fecha_fin) {
    this.id = mi_id;
    this.fechaInicio = mi_fecha_inicio;
    this.fechaFin = mi_fecha_fin;
  }

  save() {
    return db.query(`
      UPDATE ciclos_escolares
      SET inicio_inscripcion = $1::date, fin_inscripcion = $2::date
      WHERE ciclo_escolar = $3::text
    `, [this.fechaInicio, this.fechaFin, this.id]);
  }

  static fetchAll() {
    return db.query(`SELECT * FROM ciclos_escolares`);
  }

  static fetchOne(id) {
    return db.query(`
      SELECT * FROM ciclos_escolares
      WHERE ciclo_escolar = $1::text
    `, [id]);
  }

  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }

  static updateInscripciones(id, fechaInicio, fechaFin) {
    return db.query(`
      UPDATE ciclos_escolares
      SET inicio_inscripcion = $1::date, fin_inscripcion = $2::date
      WHERE ciclo_escolar = $3::text
    `, [fechaInicio, fechaFin, id]);
  }
};