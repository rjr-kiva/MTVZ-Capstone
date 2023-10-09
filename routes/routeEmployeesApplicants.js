const express = require('express');
const router = express.Router();
const controllerEmployeesApplicants = require('../controller/controllerEmployeesApplicants');

router.get('/applicants', controllerEmployeesApplicants.getEmployeesApplicants);
router.post('/', controllerEmployeesApplicants.postEmployeesApplicants);

module.exports = router;