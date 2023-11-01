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

router.get('/profile/:id', redirectLogin, controllerProfile.getProfile);
router.post('/update/:id', controllerProfile.postUpdate);

module.exports = router;