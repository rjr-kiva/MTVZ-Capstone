const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
    try {
        const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id }});
        res.render('viewProfile', {userData: req.session.userData, profileData: profileData} );
    } catch (error) {
        console.log(error)
    }
    
}

exports.postUpdate = async (req, res) => {
    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, status } = req.body;

    const updateEmployee = await prisma.employee_Data.update({
        where: {id : req.params.id},
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
            status: status
        }
    });

    res.redirect('/employees')

}
