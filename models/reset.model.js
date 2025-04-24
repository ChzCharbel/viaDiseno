const db = require("../util/database");
const crypto = require("crypto");

module.exports = class ResetToken {
  // Genera un token aleatorio y lo guarda
  static async generarToken(id_ivd, expiracionMinutos = 15) {
    const token = crypto.randomBytes(32).toString("hex");
    const fechaExpiracion = new Date(Date.now() + expiracionMinutos * 60000);

    await db.query(`
      INSERT INTO tokens_reset (id_ivd, token, expiracion, utilizado)
      VALUES ($1, $2, $3, false)
    `, [id_ivd, token, fechaExpiracion]);

    return token;
  }

  // Obtiene un token válido (no expirado y no usado)
  static async obtenerTokenValido(token) {
  console.log("🔍 Buscando token:", token);
  const result = await db.query(`
    SELECT * FROM tokens_reset
    WHERE TRIM(token) = TRIM($1) AND expiracion > CURRENT_TIMESTAMP AND utilizado = false
  `, [token]);

  console.log("📦 Resultado de la consulta:", result.rows);
  console.log("🔍 Tokens en BD desde backend:", result.rows);
  return result.rows[0];
}

  

  // Marca un token como usado
  static async marcarComoUsado(token) {
    await db.query(`
      UPDATE tokens_reset SET utilizado = true WHERE token = $1
    `, [token]);
  }

  // Limpia los tokens que ya expiraron
  static async limpiarTokensAntiguos() {
    await db.query(`
      DELETE FROM tokens_reset WHERE expiracion < CURRENT_TIMESTAMP
    `);
  }
};
