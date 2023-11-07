const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getBlacklistedProfile = async (req, res) => {

    const profileData = await prisma.blacklisted_Data.findUnique({ where: { id: req.params.id } });
    res.render('viewBlacklistedProfile', { userData: req.session.userData, profileData: profileData });

}