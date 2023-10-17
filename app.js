const express = require('express');
const path = require('path');
const session = require('express-session'); 

const app = express();
const port = 3000;

var sessionAAA = {
    authorized: false,
    username: 'guest'
};

//view engine setup
app.set('view engine', 'ejs');

//login
const loginRouter = require('./routes/routeLogin');
const homeRouter = require('./routes/routeHome');
const logoutRouter = require('./routes/routeLogout');
const employeeRouter = require('./routes/routeEmployees');
const companyRouter = require('./routes/routeCompany');
const calendarRouter = require('./routes/routeCalendar');
const recordsRouter = require('./routes/routeRecords');
const profileRouter = require('./routes/routeProfile');
const employeeApplicantsRouter = require('./routes/routeEmployeesApplicants');
const addEmployeeRouter = require('./routes/routeAddEmployee');
const blacklistedRouter = require('./routes/routeBlacklisted');

// sid.signature


//use
app.use(express.urlencoded({ extended: true }));
    //app.set('views', path.join(__dirname, 'views')); - not sure what this is but it can be removed
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/', logoutRouter);
app.use('/', employeeRouter);
app.use('/', companyRouter);
app.use('/', calendarRouter);
app.use('/', recordsRouter);
app.use('/', profileRouter);
app.use('/', employeeApplicantsRouter);
app.use('/', addEmployeeRouter);
app.use('/', blacklistedRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;