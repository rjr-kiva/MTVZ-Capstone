const express = require('express');
const router = express.Router();
const controllerRecords = require('../controller/controllerRecords');

router.get('/records', controllerRecords.getRecords);
router.post('/records', controllerRecords.postRecords);

module.exports = router;