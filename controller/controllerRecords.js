const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getRecords = async (req, res) => {
    const employeeRecords = await prisma.employee_Data.findMany();
    const blacklistedRecords = await prisma.blacklisted_Data.findMany();
    res.render('viewRecords', {userData: req.session.userData, employeeRecords: employeeRecords});
}

exports.postRecords = (req, res) => {
    res.render('viewRecords');
}