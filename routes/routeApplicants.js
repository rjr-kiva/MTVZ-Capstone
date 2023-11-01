const express = require('express');
const router = express.Router();
const controllerApplicants = require('../controller/controllerApplicants');

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

router.get('/applicants', redirectLogin, controllerApplicants.getApplicants);
router.post('/applicants', controllerApplicants.postApplicants);

module.exports = router;