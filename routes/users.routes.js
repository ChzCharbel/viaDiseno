const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/resetpassword', usersController.get_reset_password);
router.post('/resetpassword', usersController.post_reset_password);

router.get('/login', usersController.get_login);
router.post('/login', usersController.post_login);

router.get('/logout', usersController.get_logout);

module.exports = router;