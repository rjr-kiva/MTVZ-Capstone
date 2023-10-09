const express = require('express');
const router = express.Router();
const controllerCalendar = require('../controller/controllerCalendar');

router.get('/calendar', controllerCalendar.getCalendar);
router.post('/calendar', controllerCalendar.postCalendar);

module.exports = router;