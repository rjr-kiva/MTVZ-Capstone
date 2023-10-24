const express = require('express');
const router = express.Router();
const controllerEmployeesApplicants = require('../controller/controllerEmployeesApplicants');

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

router.get('/applicants', redirectLogin, controllerEmployeesApplicants.getEmployeesApplicants);
router.post('/', controllerEmployeesApplicants.postEmployeesApplicants);

module.exports = router;