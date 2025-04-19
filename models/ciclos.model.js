const db = require('../util/database');
const {getCiclosEscolares} = require('../util/admin.api.client')

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
      WHERE id_ciclo_escolar = $3::integer
    `, [this.fechaInicio, this.fechaFin, this.id]);
  }

  static fetchAll() {
    return db.query(`SELECT * FROM ciclos_escolares`);
  }

  static fetchOne(id) {
    return db.query(`
      SELECT * FROM ciclos_escolares
      WHERE id_ciclo_escolar = $1::integer
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
      WHERE id_ciclo_escolar = $3::integer
    `, [fechaInicio, fechaFin, id]);
  }

  static async getCiclosEscolares(){
    return await getCiclosEscolares();
  }

  static async sincronizarCiclosEscolaresDesdeAPI() {
    try {
        const ciclos = await getCiclosEscolares();
        for (let ciclo of ciclos) {
                const {id, code, start_date, end_date} = ciclo;
                await db.query(`
                    CALL sincronizar_ciclos_escolares($1::integer,$2::text,$3::date,$4::date);
                `, [id, code, start_date, end_date]);
        }
        console.log("Ciclos escolares sincronizados exitosamente.");
        return { mensaje: "Sincronización completada", total: ciclos.length };
    }
    catch (error) {
        console.error("Error al sincronizar ciclos escolares:", error);
        throw error;
    }
}

};