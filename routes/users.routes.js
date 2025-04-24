const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const resetController = require('../controllers/reset.controller');

router.get('/login', usersController.get_login);
router.post('/login', usersController.post_login);

router.get('/logout', usersController.get_logout);

router.get('/resetpassword', usersController.get_reset_password);
router.post('/resetpassword', usersController.post_reset_password);

router.get('/recuperar', resetController.get_recuperar_password);
router.post('/recuperar', resetController.post_recuperar_password);

router.get('/restablecer/:token', resetController.get_restablecer_password);
router.post('/restablecer', resetController.post_restablecer_password);

module.exports = router;
