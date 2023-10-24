const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getlogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }
        res.redirect('/login')
    })
};