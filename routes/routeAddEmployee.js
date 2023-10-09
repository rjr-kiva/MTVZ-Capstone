const express = require('express');
const router = express.Router();
const controllerAddEmployee = require('../controller/controllerAddEmployee');

router.get('/add-employee', controllerAddEmployee.getAddEmployee);
router.post('/', controllerAddEmployee.postAddEmployee);

module.exports = router;