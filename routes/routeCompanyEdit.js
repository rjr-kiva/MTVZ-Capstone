const express = require('express');
const router = express.Router();
const controllerEditCompany = require('../controller/controllerCompanyEdit');

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

router.get('/edit-company/:id', redirectLogin, controllerEditCompany.getEditCompany);

router.post('/edit-company/:id', controllerEditCompany.postEditCompany);

module.exports = router;