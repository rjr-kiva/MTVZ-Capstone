const express = require('express');
const router = express.Router();
const controllerLogout = require('../controller/controllerLogout');

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

router.get('/logout', redirectLogin, controllerLogout.getlogout);

module.exports = router;

