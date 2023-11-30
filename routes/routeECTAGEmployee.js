const express = require('express');
const router = express.Router();
const controllerECTAGEmployee = require('../controller/controllerECTAGEmployee');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    }else{
        next()
    }
}

const redirectHome = (req, res, next) => {

    if (req.session.userId) {
        res.redirect('/home')
    }else{
        next()
    }
}

router.get('/ectag-employee', redirectLogin, controllerECTAGEmployee.getECTAGEmployee);
router.post('/ectag-employee', controllerECTAGEmployee.postECTAGEmployee);

router.get('/ectag-employee/:id', controllerECTAGEmployee.deleteECTAGEmployee);

module.exports = router;