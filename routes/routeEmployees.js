const express = require('express');
const router = express.Router();
const controllerEmployees = require('../controller/controllerEmployees');

router.get('/employees', controllerEmployees.getEmployees);
router.post('/employees', controllerEmployees.postEmployees);

module.exports = router;