const transporter = require('./util/mailer'); // asegúrate de que la ruta esté bien si está en otra carpeta

const mailOptions = {
  from: 'ivdpruebas@gmail.com',
  to: 'lalilianrdz@gmail.com', // o tu correo personal
  subject: 'Correo de prueba desde Node.js',
  text: '¡Hola! Este es un correo de prueba para verificar que nodemailer esté funcionando.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Error al enviar:', error);
  } else {
    console.log('📬 ¡Correo enviado!: ', info.response);
  }
});
