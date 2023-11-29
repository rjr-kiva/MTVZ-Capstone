const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getViewEmploymentHistory = async (req, res) => {

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    const companyNameView = await prisma.company_Data.findMany();
    const companyJustId = await prisma.company_Data.findMany({select: { id:true }})
    const companyJustName = await prisma.company_Data.findMany({select: { companyName:true }})
    
    var companyJustAnotherId = []
    var companyJustAnotherName = []

    companyJustId.forEach((dataInfo)=>{
        companyJustAnotherId.push(dataInfo.id)
    })

    companyJustName.forEach((dataInfo)=>{
        companyJustAnotherName.push(dataInfo.companyName)
    })
    
    res.render('viewRPEmploymentHistory', { userData: req.session.userData, profileData: profileData, companyNameView:companyNameView, companyJustAnotherId:companyJustAnotherId, companyJustAnotherName:companyJustAnotherName });

}

exports.postAddEmploymentHistory = async (req, res) => {

    res.redirect('/records')

}