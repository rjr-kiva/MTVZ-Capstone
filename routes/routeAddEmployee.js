const express = require('express');
const router = express.Router();
const controllerAddEmployee = require('../controller/controllerAddEmployee');

const multer = require('multer');

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
    destination: './public/uploads',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

router.get('/add-employee', redirectLogin, controllerAddEmployee.getAddEmployee);
router.post('/add-employee', controllerAddEmployee.postAddEmployee);

router.get('/add-ectagemployee', redirectLogin, controllerAddEmployee.getAddECTAGEmployee);
router.post('/add-ectagemployee', controllerAddEmployee.postAddECTAGEmployee);

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), controllerAddEmployee.postUpload);

module.exports = router;