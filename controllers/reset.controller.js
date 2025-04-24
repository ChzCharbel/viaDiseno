const ResetModel = require('../models/reset.model');
const Usuario = require('../models/users.model');
const crypto = require('crypto');
const transporter = require('../util/mailer'); 
const { getUserById } = require('../util/admin.api.client');


exports.get_recuperar_password = (req, res) => {
  res.render('login.ejs', {
    csrfToken: req.csrfToken(),
    isReset: true,
    error: req.session.error || '',
    info: req.session.info || '',
    privilegios: req.session.privilegios || [],
    username: req.session.username || '',
    mail: req.session.mail || '',
    rol: req.session.rol || '',
    carrera: req.session.carrera || ''
  });
};

exports.post_recuperar_password = async (request, response) => {
  const matricula = (request.body.matriculaInput || '').trim();

  try {
    console.log('📨 Iniciando recuperación para matrícula:', matricula);

    const usuario = await getUserById(matricula);
    console.log('👤 Usuario encontrado:', usuario);

    if (!usuario || usuario.status !== 'success' || !usuario.data.email) {
      request.session.error = 'No se encontró un usuario activo con esa matrícula.';
      return response.redirect('/users/recuperar');
    }

    const correo = usuario.data.email;

    console.log("🕒 Hora del servidor:", new Date());


    // ✅ Generamos el token y lo guardamos en la base de datos
    const token = await ResetModel.generarToken(matricula);
    console.log('💾 Token generado y guardado para:', matricula);

    // ✅ Enviamos el correo
    console.log('📧 Enviando correo a:', correo);

    const info = await transporter.sendMail({
      from: '"IVD Soporte" <ivdpruebas@gmail.com>',
      to: correo,
      subject: 'Recuperación de contraseña - IVD',
      html: `
        <p>Hola,</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="http://localhost:3000/users/restablecer/${token}">Restablecer contraseña</a>
        <p>Este enlace expirará en 15 minutos.</p>
      `
    });

    console.log('✅ Correo enviado:', info.response);
    request.session.info = 'Si existe una cuenta vinculada a esa matrícula, se ha enviado un correo con las instrucciones.';
    response.redirect('/');

  } catch (error) {
    console.error('❌ Error durante el proceso de recuperación:', error);
    request.session.error = 'Ocurrió un error al procesar la recuperación.';
    response.redirect('/users/recuperar');
  }
};



exports.get_restablecer_password = async (req, res) => {
  const token = req.params.token;

  try {
    console.log("🔍 Token recibido:", token);
    const tokenValido = await ResetModel.obtenerTokenValido(token);
    console.log("✅ Resultado búsqueda en BD:", tokenValido);

    if (!tokenValido) {
      return res.send("El enlace ha expirado o ya fue utilizado.");
    }

    res.render("restablecer_password.ejs", {
      token,
      csrfToken: req.csrfToken(),
      error: req.session.error || '',
      info: req.session.info || ''
    });

  } catch (error) {
    console.error("❌ Error al validar token:", error);
    res.send("Error al procesar la solicitud.");
  }
};


exports.post_restablecer_password = async (req, res) => {
  const { nuevaPassword, token } = req.body;

  try {
    const tokenData = await ResetModel.obtenerTokenValido(token);

    if (!tokenData) {
      req.session.error = 'El enlace de recuperación ha expirado o ya fue utilizado.';
      return res.redirect('/users/recuperar');
    }

    const id_ivd = tokenData.id_ivd;

    // Cambiar la contraseña cifrada
    await Usuario.actualizarPassword(id_ivd, nuevaPassword);

    // Marcar el token como utilizado
    await ResetModel.marcarComoUsado(token);

    req.session.info = 'Tu contraseña ha sido restablecida correctamente.';
    return res.redirect('/');

  } catch (error) {
    console.error('❌ Error al restablecer contraseña:', error);
    req.session.error = 'Ocurrió un error al restablecer tu contraseña.';
    res.redirect(`/users/restablecer/${token}`);
  }
};


