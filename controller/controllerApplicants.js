const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getApplicants = async (req, res) => {
    const employeeInfo = await prisma.applicant_Data.findMany();
    res.render('viewApplicants', {employeeInfo: employeeInfo, userData: req.session.userData, messageDupe: req.flash('message')});
}

exports.postApplicants = (req, res) => {
    res.render('viewApplicants');
}