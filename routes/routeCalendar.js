const express = require('express');
const router = express.Router();
const controllerCalendar = require('../controller/controllerCalendar');

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

router.get('/calendar', redirectLogin, controllerCalendar.getCalendar);
router.post('/calendar', controllerCalendar.postCalendar);

module.exports = router;