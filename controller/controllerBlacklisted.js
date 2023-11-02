const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getBlacklisted = async (req, res) => {
    const blacklistedRecords = await prisma.blacklisted_Data.findMany();
    res.render('viewBlacklisted', {userData: req.session.userData, blacklistedRecords: blacklistedRecords});
}

exports.postBlacklisted = (req, res) => {
    res.render('viewBlacklisted');
}