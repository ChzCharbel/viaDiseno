const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ivdpruebas@gmail.com',
    pass: 'ighh bryn knha dfrl',
  },
});

module.exports = transporter;
