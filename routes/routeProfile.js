const express = require('express');
const router = express.Router();
const controllerProfile = require('../controller/controllerProfile');

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

router.get('/applicant-profile/:id', redirectLogin, controllerProfile.getApplicantProfile);
router.post('/applicant-update/:id', controllerProfile.postUpdate);

router.get('/employee-profile/:id', redirectLogin, controllerProfile.getEmployeeProfile)
router.post('/employee-update/:id', controllerProfile.postEmployeeUpdate);

router.get('/ectag-employee-profile/:id', redirectLogin, controllerProfile.getECTAGEmployeeProfile)
router.post('/ectag-employee-update/:id', controllerProfile.postECTAGEmployeeUpdate);

router.get('/blacklisted-profile/:id', redirectLogin, controllerProfile.getBlacklistedProfile)

module.exports = router;