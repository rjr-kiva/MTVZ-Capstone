const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

const bcrypt = require("bcrypt")

exports.getApplicantProfile = async (req, res) => {

    const profileData = await prisma.applicant_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewProfile', { userData: req.session.userData, profileData: profileData });

}

exports.postUpdate = async (req, res) => {
    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, status, reason } = req.body;

    if (status == "Accepted") {
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
                status: "Employee"
            }
        })

        const deleteEmployee = await prisma.applicant_Data.delete({
            where: { id: req.params.id },
        });

    } else
        if (status == "Blacklisted") {
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
                    status: "Blacklisted",
                    reason: reason
                }
            })

            const deleteEmployee = await prisma.applicant_Data.delete({
                where: { id: req.params.id },
            });
        } else
            if (status == "Pending") {
                console.log("Pending")

                const pendingEmployee = await prisma.applicant_Data.update({
                    where:{
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
                        status: "Pending",
                    }
                });

            }

    res.redirect('/applicants')

}

exports.getEmployeeProfile = async (req, res) => {

    const profileData = await prisma.employee_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewProfile', { userData: req.session.userData, profileData: profileData });

}

exports.postEmployeeUpdate = async (req, res) => {
    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, status } = req.body;


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
            status: "Employee"
        }
    })

    res.redirect('/records')

}

exports.getECTAGEmployeeProfile = async (req, res) => {

    const profileData = await prisma.user_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewProfile', { userData: req.session.userData, profileData: profileData });

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

exports.getBlacklistedProfile = async (req, res) => {

    const profileData = await prisma.blacklisted_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewProfile', { userData: req.session.userData, profileData: profileData });

}