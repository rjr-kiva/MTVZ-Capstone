const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getEmployeesApplicants= async (req, res) => {
    const employeeInfo = await prisma.employee_Data.findMany();
    res.render('viewEmployeesApplicants', {employeeInfo: employeeInfo, userData: req.session.userData});
}

exports.postEmployeesApplicants = (req, res) => {
    res.render('viewEmployeesApplicants');
}