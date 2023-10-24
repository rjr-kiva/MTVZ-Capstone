const express = require('express');
const router = express.Router();
const controllerRecords = require('../controller/controllerRecords');

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

router.get('/records', redirectLogin, controllerRecords.getRecords);
router.post('/records', controllerRecords.postRecords);

module.exports = router;