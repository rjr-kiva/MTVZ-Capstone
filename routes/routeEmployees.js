const express = require('express');
const router = express.Router();
const controllerEmployees = require('../controller/controllerEmployees');

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

router.get('/employees', redirectLogin, controllerEmployees.getEmployees);
router.post('/employees', controllerEmployees.postEmployees);

module.exports = router;