const express = require('express');
const router = express.Router();
const controllerApplicantProfile = require('../controller/controllerApplicantProfile');

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

router.get('/applicant-profile/:id', redirectLogin, controllerApplicantProfile.getApplicantProfile);
router.post('/applicant-update/:id', controllerApplicantProfile.postUpdate);

module.exports = router;