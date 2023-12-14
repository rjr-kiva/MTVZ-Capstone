const express = require('express');
const router = express.Router();
const controllerLogin = require('../controller/controllerLogin');

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

router.get('/login', redirectHome, controllerLogin.getLogin); // can do /login or just /
router.post('/login', redirectHome, controllerLogin.postLogin);
router.post('/verify', redirectHome, controllerLogin.verifyLogin)

module.exports = router;