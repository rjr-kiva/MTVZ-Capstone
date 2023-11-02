const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getProfile = async (req, res) => {

        const profileData = await prisma.applicant_Data.findUnique({ where: { id: req.params.id }});
        res.render('viewProfile', {userData: req.session.userData, profileData: profileData} );
    
}

exports.postUpdate = async (req, res) => {
    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, status } = req.body;

    if (status == "Accepted"){
        console.log("Accepted")

        const acceptedEmployee = await prisma.employee_Data.create({
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
            }
        })

        const deleteEmployee = await prisma.applicant_Data.delete({
            where: {id : req.params.id},
        });

    }else 
    if (status == "Blacklisted"){
        console.log("Blacklisted")

        const blacklistedEmployee = await prisma.blacklisted_Data.create({
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
            }
        })

        const deleteEmployee = await prisma.applicant_Data.delete({
            where: {id : req.params.id},
        });
    }
    
    res.redirect('/applicants')

}
