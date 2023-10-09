const express = require('express');
const router = express.Router();
const controllerLogout = require('../controller/controllerLogout');

router.get('/logout', controllerLogout.getlogout);

module.exports = router;

