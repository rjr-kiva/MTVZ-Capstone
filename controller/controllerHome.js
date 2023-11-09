const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getHome = async (req, res) => {

    const employees = await prisma.employee_Data.findMany()
    const companies = await prisma.company_Data.findMany()
    const blacklist = await prisma.blacklisted_Data.findMany()
    const ectag = await prisma.user_Data.findMany()

    res.render('viewHome', {userData: req.session.userData, employees: employees, companies: companies, blacklist: blacklist, ectag: ectag});
}

exports.postHome = (req, res) => {
    res.render('viewHome');
}