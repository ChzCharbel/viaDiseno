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
    response.redirect('/users/recuperar');

  } catch (error) {
    console.error('❌ Error durante el proceso de recuperación:', error);
    request.session.error = 'Ocurrió un error al procesar la recuperación.';
    response.redirect('/users/recuperar');
  }
};



exports.get_restablecer_password = (req, res) => {
  res.send("Vista para ingresar nueva contraseña (pendiente de implementar)");
};

exports.post_restablecer_password = (req, res) => {
  res.send("Lógica para guardar nueva contraseña (pendiente de implementar)");
};

