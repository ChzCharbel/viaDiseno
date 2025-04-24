const db = require("../util/database");
const crypto = require("crypto");

module.exports = class ResetToken {
  static async generarToken(matricula, expiracionMinutos = 15) {
    const token = crypto.randomBytes(32).toString("hex");
    const fechaExpiracion = new Date(Date.now() + expiracionMinutos * 60000);

    await db.query(
      `INSERT INTO tokens_reset (id_ivd, token, expiracion, utilizado)
       VALUES ($1, $2, $3, false)`,
      [matricula, token, fechaExpiracion]
    );    

    return token;
  }

  static async obtenerTokenValido(token) {
    const result = await db.query(
      `SELECT * FROM tokens_reset
       WHERE token = $1 AND expiracion > CURRENT_TIMESTAMP AND utilizado = false`,
      [token]
    );
    return result.rows[0];
  }

  static async marcarComoUsado(token) {
    await db.query(`UPDATE reset_tokens SET usado = true WHERE token = $1`, [token]);
  }

  static async limpiarTokensAntiguos() {
    await db.query(`DELETE FROM reset_tokens WHERE expiracion < CURRENT_TIMESTAMP`);
  }
};
