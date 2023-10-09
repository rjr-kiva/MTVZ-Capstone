const express = require('express');
const router = express.Router();
const controllerLogin = require('../controller/controllerLogin');

router.get('/login', controllerLogin.getLogin); // can do /login or just /
router.post('/login', controllerLogin.postLogin);

module.exports = router;