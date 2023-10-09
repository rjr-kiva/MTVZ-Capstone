const express = require('express');
const router = express.Router();
const controllerSettings = require('../controller/controllerSettings');

router.get('/settings', controllerSettings.getSettings);
router.post('/settings', controllerSettings.postSettings);

module.exports = router;