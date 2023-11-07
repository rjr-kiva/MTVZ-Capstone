const express = require('express');
const router = express.Router();
const controllerBlacklistedProfile = require('../controller/controllerBlacklistedProfile');

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

router.get('/blacklisted-profile/:id', redirectLogin, controllerBlacklistedProfile.getBlacklistedProfile)

module.exports = router;