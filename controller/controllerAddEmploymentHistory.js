const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getAddEmploymentHistory = async (req, res) => {
    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    const companyList = await prisma.company_Data.findMany()
    res.render('viewAddEmploymentHistory', {userData: req.session.userData, profileData: profileData, companyList: companyList, purpose: "Add History"});
}

exports.postAddEmploymentHistory = async (req, res) => {

    const { companyName, companyStartDate, companyEndDate, companyRemarks} = req.body;

    const employmenthistoryArray = [companyName, companyStartDate, companyEndDate, companyRemarks]

    console.log(employmenthistoryArray)

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });

    profileData.companyName.push(companyName)
    profileData.companyStartDate.push(companyStartDate)
    profileData.companyEndDate.push(companyEndDate)
    profileData.companyRemarks.push(companyRemarks)
    
    const employmentHistoryUpdate = await prisma.employee_Data.update({
        where: {
            id: req.params.id
        },
        data: {
            companyName: profileData.companyName,
            companyStartDate: profileData.companyStartDate,
            companyEndDate: profileData.companyEndDate,
            companyRemarks: profileData.companyRemarks,
        }
    })

    res.redirect(`/view-employment-history/${req.params.id}`)
}

exports.getUpdateEmploymentHistory = async (req, res) => {
    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    const companyList = await prisma.company_Data.findMany()
    res.render('viewAddEmploymentHistory', {userData: req.session.userData, profileData: profileData, companyList: companyList, purpose: "Update History", index: req.params.index  });
}

exports.postUpdateEmploymentHistory = async (req, res) => {

    const { companyName, companyStartDate, companyEndDate, companyRemarks} = req.body;

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });

    profileData.companyName[req.params.index] = companyName
    profileData.companyStartDate[req.params.index] = companyStartDate
    profileData.companyEndDate[req.params.index] = companyEndDate
    profileData.companyRemarks[req.params.index] = companyRemarks
    
    const employmentHistoryUpdate = await prisma.employee_Data.update({
        where: {
            id: req.params.id
        },
        data: {
            companyName: profileData.companyName,
            companyStartDate: profileData.companyStartDate,
            companyEndDate: profileData.companyEndDate,
            companyRemarks: profileData.companyRemarks,
        }
    })

    res.redirect(`/view-employment-history/${req.params.id}`)
}