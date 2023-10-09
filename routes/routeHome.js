const express = require('express');
const router = express.Router();
const controllerHome = require('../controller/controllerHome');

router.get('/home', controllerHome.getHome);
router.post('/', controllerHome.postHome);

module.exports = router;