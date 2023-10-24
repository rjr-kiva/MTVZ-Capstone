const express = require('express');
const router = express.Router();
const controllerBlacklisted = require('../controller/controllerBlacklisted');

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

router.get('/blacklisted', redirectLogin, controllerBlacklisted.getBlacklisted);
router.post('/blacklisted', controllerBlacklisted.postBlacklisted);

module.exports = router;