const express = require('express');
const router = express.Router();
const controllerProfile = require('../controller/controllerProfile');

router.get('/profile', controllerProfile.getProfile);
router.post('/profile', controllerProfile.postProfile);

module.exports = router;