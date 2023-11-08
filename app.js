const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

//const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    NODE_ENV = 'development',

    SESSION_NAME = 'sid',
    SESSION_SECRET = 'ssh!quiet,it\'asecret!',
    //SESSION_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        //maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

//view engine setup
app.set('view engine', 'ejs');

//login
const loginRouter = require('./routes/routeLogin');
const homeRouter = require('./routes/routeHome');
const logoutRouter = require('./routes/routeLogout');
const applicantsRouter = require('./routes/routeApplicants');
const profileApplicantRouter = require('./routes/routeApplicantProfile');
const companyRouter = require('./routes/routeCompany');
const companyEditRouter = require('./routes/routeCompanyEdit');
const recordsRouter = require('./routes/routeRecords');
const recordProfileRouter = require('./routes/routeRecordProfile');
const rpEmploymentHistory = require('./routes/routeRPEmploymentHistory');
const addEmploymentHistory = require('./routes/routeAddEmploymentHistory');
const addEmployeeRouter = require('./routes/routeAddEmployee');
const blacklistedRouter = require('./routes/routeBlacklisted');
const blacklistedProfileRouter = require('./routes/routeBlacklistedProfile');
const ectagEmployeeRouter = require('./routes/routeECTAGEmployee');
const ectagEmployeeProfileRouter = require('./routes/routeECTAGEmployeeProfile');
// sid.signature


//use
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/', logoutRouter);
app.use('/', applicantsRouter);
app.use('/', profileApplicantRouter);
app.use('/', companyRouter);
app.use('/', companyEditRouter);
app.use('/', recordsRouter);
app.use('/', recordProfileRouter);
app.use('/', rpEmploymentHistory)
app.use('/', addEmploymentHistory)
app.use('/', addEmployeeRouter);
app.use('/', blacklistedRouter);
app.use('/', blacklistedProfileRouter);
app.use('/', ectagEmployeeRouter);
app.use('/', ectagEmployeeProfileRouter);
app.get('/', (req,res) => {
    const { userId } = req.session;
    res.redirect('/login')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;