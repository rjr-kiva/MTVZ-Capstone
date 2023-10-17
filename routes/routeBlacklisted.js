const express = require('express');
const router = express.Router();
const controllerBlacklisted = require('../controller/controllerBlacklisted');

router.get('/blacklisted', controllerBlacklisted.getBlacklisted);
router.post('/blacklisted', controllerBlacklisted.postBlacklisted);

module.exports = router;