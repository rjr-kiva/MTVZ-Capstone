const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getCompany = async (req, res) => {

    const companyList = await prisma.company_Data.findMany()

    res.render('viewCompany', {companyList: companyList, userData: req.session.userData});
}

exports.postaddCompany = async (req, res) => {

    const { companyName, companyAddress, contactNo, contactPerson} = req.body

    const newCompany = await prisma.company_Data.create({
        data: {
            companyName: companyName,
            companyAddress: companyAddress,
            contactNo: contactNo,
            contactPerson: contactPerson
        }
    })

    res.redirect('/company');
}