const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getECTAGEmployeeProfile = async (req, res) => {

    const profileData = await prisma.user_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewECTAGEmployeeProfile', { userData: req.session.userData, profileData: profileData });

}

exports.postECTAGEmployeeUpdate = async (req, res) => {
    const {email, password, name, age, contactNumber, address, gender, role} = req.body;

    const hashword = await bcrypt.hash(password, 10)

    if(password == ""){
        const updateECTAGEmployee = await prisma.user_Data.update({
            where: {
                id: req.params.id
            },
            data: {
                email: email,
                name: name,
                age: age,
                contactNo:  contactNumber,
                address: address,
                gender: gender,
                role: role
            }
        })
    }else{
        const updateECTAGEmployee = await prisma.user_Data.update({
            where: {
                id: req.params.id
            },
            data: {
                email: email,
                password: hashword,
                name: name,
                age: age,
                contactNo:  contactNumber,
                address: address,
                gender: gender,
                role: role
            }
        })
    }

    res.redirect('/ectag-employee')

}