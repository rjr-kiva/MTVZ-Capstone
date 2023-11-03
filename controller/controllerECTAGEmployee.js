const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getECTAGEmployee = async (req, res) => {
    const employeeECTAGInfo = await prisma.user_Data.findMany();
    res.render('viewECTAGEmployee', {employeeECTAGInfo: employeeECTAGInfo, userData: req.session.userData});
}

exports.postECTAGEmployee = (req, res) => {
    res.render('viewApplicants');
}