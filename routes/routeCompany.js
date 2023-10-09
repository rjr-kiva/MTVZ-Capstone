const express = require('express');
const router = express.Router();
const controllerCompany = require('../controller/controllerCompany');

router.get('/company', controllerCompany.getCompany);
router.post('/company', controllerCompany.postCompany);

module.exports = router;