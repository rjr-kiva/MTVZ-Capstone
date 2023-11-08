const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getViewEmploymentHistory = async (req, res) => {

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewRPEmploymentHistory', { userData: req.session.userData, profileData: profileData });

}

exports.postAddEmploymentHistory = async (req, res) => {

    res.redirect('/records')

}