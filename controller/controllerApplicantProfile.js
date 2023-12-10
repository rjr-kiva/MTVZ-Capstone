const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getApplicantProfile = async (req, res) => {

    const profileData = await prisma.applicant_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewApplicantProfile', { userData: req.session.userData, profileData: profileData });

}

exports.postUpdate = async (req, res) => {
    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, status, reason, eduBG } = req.body;

    if (status == "Accepted") {
        console.log("Accepted")

        const duplicateEmployee = await prisma.employee_Data.findFirst({
            where: {
                lastName: lastname,
                firstName: firstname,
                middleName: middlename,
                philHealthNo: PhilHealth,
                pagibigNo: Pagibig,
                position: Position,
            }
        })

        if (duplicateEmployee) {
            req.flash('message', 'Existing record found, duplicate record deleted.');
            console.log("Has Dupe")

            const deleteEmployee = await prisma.applicant_Data.delete({
                where: { id: req.params.id },
            });

        } else {
            console.log("Has no Dupe")

            const date = new Date();

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const hiredDate = months[date.getMonth()] + " " + date.getDate()  + ", " + date.getFullYear()

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
                    status: "Employee",
                    currentlyDeployed: "false",
                    dateHired: hiredDate,
                    educationalBG: eduBG
                }
            })

            const deleteEmployee = await prisma.applicant_Data.delete({
                where: { id: req.params.id },
            });

        }

    } else if (status == "Blacklisted") {
        console.log("Blacklisted")

        const duplicateEmployee = await prisma.blacklisted_Data.findFirst({
            where: {
                lastName: lastname,
                firstName: firstname,
                middleName: middlename,
                philHealthNo: PhilHealth,
                pagibigNo: Pagibig,
                position: Position,
            }
        })

        if (duplicateEmployee) {
            req.flash('message', 'Existing record found, duplicate record deleted.');
            console.log("Has Dupe")

            const deleteEmployee = await prisma.applicant_Data.delete({
                where: { id: req.params.id },
            });

        } else {
            console.log("Has no Dupe")

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

        }  

    } else if (status == "Pending") {
        console.log("Pending")

        const pendingEmployee = await prisma.applicant_Data.update({
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
                status: "Pending",
            }
        });

    }

    res.redirect('/applicants')

}