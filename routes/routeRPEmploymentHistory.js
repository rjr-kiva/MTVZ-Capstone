const express = require('express');
const router = express.Router();
const controllerRPEmploymentHistory = require('../controller/controllerRPEmploymentHistory');

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

router.get('/view-employment-history/:id', redirectLogin, controllerRPEmploymentHistory.getViewEmploymentHistory)
router.post('/view-employment-history/:id', controllerRPEmploymentHistory.postAddEmploymentHistory);

module.exports = router;