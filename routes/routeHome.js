const express = require('express');
const router = express.Router();
const controllerHome = require('../controller/controllerHome');

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

router.get('/home', redirectLogin, controllerHome.getHome);
router.post('/', controllerHome.postHome);

module.exports = router;