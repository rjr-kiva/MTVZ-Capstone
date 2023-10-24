const express = require('express');
const router = express.Router();
const controllerAddEmployee = require('../controller/controllerAddEmployee');

const multer = require('multer');

const { v4: uuidv4 } = require('uuid');

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

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, callback) {
        callback(null, uuidv4() + '-' + file.originalname);
    },
});

router.get('/add-employee', redirectLogin, controllerAddEmployee.getAddEmployee);
router.post('/add-employee', controllerAddEmployee.postAddEmployee);

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), controllerAddEmployee.postUpload);

module.exports = router;