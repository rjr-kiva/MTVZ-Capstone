const express = require('express');
const router = express.Router();
const controllerCompany = require('../controller/controllerCompany');

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

router.get('/company', redirectLogin, controllerCompany.getCompany);
router.post('/company', controllerCompany.postCompany);

module.exports = router;