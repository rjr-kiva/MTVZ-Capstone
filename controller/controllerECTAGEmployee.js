const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getECTAGEmployee = async (req, res) => {
    const employeeECTAGInfo = await prisma.user_Data.findMany();
    const employeeECTAGInfoCOunt = await prisma.user_Data.findMany({where:{OR: [{role: "HR Assistant"}, {role: "HR Head"}]}});
    res.render('viewECTAGEmployee', {employeeECTAGInfo: employeeECTAGInfo, userData: req.session.userData, employeeECTAGInfoCOunt: employeeECTAGInfoCOunt});
}

exports.postECTAGEmployee = (req, res) => {
    res.render('viewApplicants');
}

exports.deleteECTAGEmployee = async (req, res) => {

    const deleteEmployee = await prisma.user_Data.delete({where: {
        id: req.params.id
    }})
    res.redirect('/ectag-employee');
}