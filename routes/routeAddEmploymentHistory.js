const express = require('express');
const router = express.Router();
const controllerAddEmploymentHistory = require('../controller/controllerAddEmploymentHistory');

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

router.get('/add-employment-history/:id', redirectLogin, controllerAddEmploymentHistory.getAddEmploymentHistory);
router.post('/add-employment-history/:id', controllerAddEmploymentHistory.postAddEmploymentHistory);

router.get('/update-employment-history/:id/:index', redirectLogin, controllerAddEmploymentHistory.getUpdateEmploymentHistory);
router.post('/update-employment-history/:id/:index', controllerAddEmploymentHistory.postUpdateEmploymentHistory );
module.exports = router;