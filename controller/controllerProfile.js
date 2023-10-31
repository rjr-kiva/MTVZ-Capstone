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

exports.postProfile = (req, res) => {
    res.render('viewProfile');
}