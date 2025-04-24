const express = require('express');
const router = express.Router();
const salonesController = require('../controllers/salones.controller');

router.post('/asignar', salonesController.postAsignarSalon);
router.get('/prueba', (req, res) => {
  res.send('Ruta de salones funcionando');
});


module.exports = router;