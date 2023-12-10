const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getEmployeeProfile = async (req, res) => {

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewRecordProfile', { userData: req.session.userData, profileData: profileData });

}

exports.postEmployeeUpdate = async (req, res) => {
    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, status, eduBG } = req.body;


    const updateEmployee = await prisma.employee_Data.update({
        where: {
            id: req.params.id
        },
        data: {
            lastName: lastname,
            firstName: firstname,
            middleName: middlename,
            age: age,
            sex: sex,
            address: address,
            contactNo: contactNumber,
            birthdate: dateofbirth,
            sssNo: SSS,
            philHealthNo: PhilHealth,
            pagibigNo: Pagibig,
            position: Position,
            status: "Employee",
            educationalBG: eduBG
        }
    })

    res.redirect('/records')

}