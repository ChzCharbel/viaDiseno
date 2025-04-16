const db = require('../util/database');

module.exports = class Materia {
  static fetchAll() {
    return db.query(`
      SELECT "idMateria", "nombreMateria" FROM "Materia"
    `)
    .then(result => {
      console.log('Materias →', result.rows);
      return result;
    })
    .catch(err => {
      console.error('ERROR AL CONSULTAR MATERIAS →', err);
      throw err;
    });
  }
};