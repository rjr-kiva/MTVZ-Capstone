const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

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
const companyRouter = require('./routes/routeCompany');
const calendarRouter = require('./routes/routeCalendar');
const recordsRouter = require('./routes/routeRecords');
const profileRouter = require('./routes/routeProfile');
const addEmployeeRouter = require('./routes/routeAddEmployee');
const blacklistedRouter = require('./routes/routeBlacklisted');

// sid.signature


//use
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/', logoutRouter);
app.use('/', applicantsRouter);
app.use('/', companyRouter);
app.use('/', calendarRouter);
app.use('/', recordsRouter);
app.use('/', profileRouter);
app.use('/', addEmployeeRouter);
app.use('/', blacklistedRouter);
app.get('/', (req,res) => {
    const { userId } = req.session;
    res.redirect('/login')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;