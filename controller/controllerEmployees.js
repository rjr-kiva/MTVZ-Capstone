const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getEmployees = async (req, res) => {
    const employeeInfo = await prisma.employee_Data.findMany();
    res.render('viewEmployees', {employeeInfo: employeeInfo, userData: req.session.userData});
}

exports.postEmployees = (req, res) => {
    res.render('viewEmployees');
}