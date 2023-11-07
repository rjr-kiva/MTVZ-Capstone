const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getEditCompany = async (req, res) => {

    const companyRecord = await prisma.company_Data.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.render('viewCompanyEdit', {companyRecord: companyRecord, userData: req.session.userData});
}

exports.postEditCompany = async (req, res) => {

    const { companyName, companyAddress, contactNo, contactPerson} = req.body

    const updateCompany = await prisma.company_Data.update({
        where:{
            id: req.params.id
        },
        data: {
            companyName: companyName,
            companyAddress: companyAddress,
            contactNo: contactNo,
            contactPerson: contactPerson
        }
    })

    res.redirect('/company');
}