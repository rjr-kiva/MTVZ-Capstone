const express = require('express');
const router = express.Router();
const controllerEmployeesGrid = require('../controller/controllerEmployeesGrid');

router.get('/employees-grid', controllerEmployeesGrid.getEmployeesGrid);
router.post('/employees-grid', controllerEmployeesGrid.postEmployeesGrid);

module.exports = router;