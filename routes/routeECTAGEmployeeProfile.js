const express = require('express');
const router = express.Router();
const controllerECTAGEmployeeProfile = require('../controller/controllerECTAGEmployeeProfile');

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

router.get('/ectag-employee-profile/:id', redirectLogin, controllerECTAGEmployeeProfile.getECTAGEmployeeProfile)
router.post('/ectag-employee-update/:id', controllerECTAGEmployeeProfile.postECTAGEmployeeUpdate);

module.exports = router;