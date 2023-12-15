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
    const employeesMale = await prisma.employee_Data.count({where: {sex: "Male" }});
    const employeesFemale = await prisma.employee_Data.count({where: {sex: "Female" }});

    const employeePosistion = await prisma.employee_Data.findMany({select: { position: true }})

    var newEmpoyeePosition = []

    for (let index = 0; index < employeePosistion.length; index++) {
        newEmpoyeePosition.push(employeePosistion[index].position)
    }

    var uniquePositions = []

    newEmpoyeePosition.forEach((dataInfo) => {
        if(!uniquePositions.includes(dataInfo)){
            uniquePositions.push(dataInfo)
        }
    })

    var employeePos = []
    
    for (const element of newEmpoyeePosition) {
        if (employeePos[element]) {
            employeePos[element] += 1;
        } else {
            employeePos[element] = 1;
        }
    }

    var tooLazy = []

    for (const element of uniquePositions) {
        tooLazy.push(employeePos[element])
    }

    res.render('viewHome', { userData: req.session.userData, applicants: applicants, employees: employees, companies: companies, blacklist: blacklist, 
        ectag: ectag, ectagAdmin: ectagAdmin, applicantCounter: applicantCounter, employeesMale: employeesMale, employeesFemale: employeesFemale, 
        uniquePositions: uniquePositions, employeePos: tooLazy});
}

exports.postHome = (req, res) => {
    res.render('viewHome');
}