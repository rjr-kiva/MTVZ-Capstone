const express = require('express');
const router = express.Router();
const controllerRecordProfile = require('../controller/controllerRecordProfile');

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

router.get('/employee-profile/:id', redirectLogin, controllerRecordProfile.getEmployeeProfile)
router.post('/employee-update/:id', controllerRecordProfile.postEmployeeUpdate);

module.exports = router;