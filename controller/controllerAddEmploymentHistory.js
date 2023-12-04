const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getAddEmploymentHistory = async (req, res) => {
    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    const companyList = await prisma.company_Data.findMany()
    res.render('viewAddEmploymentHistory', {userData: req.session.userData, profileData: profileData, companyList: companyList, purpose: "Add History"});
}

exports.postAddEmploymentHistory = async (req, res) => {

    const { companyName, companyStartDate, companyEndDate, companyRatings, currentlyDep} = req.body;

    console.log(currentlyDep)

    const companyID = await prisma.company_Data.findUnique({where: {companyName: companyName}})

    // Can remove
    const employmenthistoryArray = [companyID.id, companyStartDate, companyEndDate, companyRatings]

    console.log(employmenthistoryArray)
    // Until here

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });

    profileData.companyName.push(companyID.id)
    profileData.companyStartDate.push(companyStartDate)
    profileData.companyEndDate.push(companyEndDate)
    profileData.companyRatings.push(companyRatings)
    
    const employmentHistoryUpdate = await prisma.employee_Data.update({
        where: {
            id: req.params.id
        },
        data: {
            companyName: profileData.companyName,
            companyStartDate: profileData.companyStartDate,
            companyEndDate: profileData.companyEndDate,
            companyRatings: profileData.companyRatings,
            currentlyDeployed: currentlyDep
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

    const { companyName, companyStartDate, companyEndDate, companyRatings, currentlyDep} = req.body;

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });

    const companyID = await prisma.company_Data.findUnique({where: {companyName: companyName}})
    console.log(companyName)
    console.log(companyID)

    profileData.companyName[req.params.index] = companyID.id
    profileData.companyStartDate[req.params.index] = companyStartDate
    profileData.companyEndDate[req.params.index] = companyEndDate
    profileData.companyRatings[req.params.index] = companyRatings
    
    const employmentHistoryUpdate = await prisma.employee_Data.update({
        where: {
            id: req.params.id
        },
        data: {
            companyName: profileData.companyName,
            companyStartDate: profileData.companyStartDate,
            companyEndDate: profileData.companyEndDate,
            companyRatings: profileData.companyRatings,
            currentlyDeployed: currentlyDep
        }
    })

    res.redirect(`/view-employment-history/${req.params.id}`)
}