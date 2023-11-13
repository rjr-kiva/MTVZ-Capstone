const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getHome = async (req, res) => {
    const date = new Date()
    const getYear = date.getFullYear()

    const applicants = await prisma.applicant_Data.findMany()
    const employees = await prisma.employee_Data.findMany()
    const companies = await prisma.company_Data.findMany()
    const blacklist = await prisma.blacklisted_Data.findMany()
    const ectag = await prisma.user_Data.findMany()
    const ectagAdmin = await prisma.user_Data.findMany({ where: { OR: [{ role: "HR Assistant" }, { role: "HR Head" }] } })
    const applicantCounter = await prisma.applicantDate_Counter.findUnique({ where: {year: getYear}})

    res.render('viewHome', { userData: req.session.userData, applicants: applicants, employees: employees, companies: companies, blacklist: blacklist, ectag: ectag, ectagAdmin: ectagAdmin, applicantCounter:applicantCounter });
}

exports.postHome = (req, res) => {
    res.render('viewHome');
}