const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('viewLogin');

}

exports.postLogin = async (req, res) => {

    if (req.body.email && req.body.password) {

        const { email, password } = req.body;
        console.log(email, password)

        const user = await prisma.user_Data.findUnique({
            where: { email }
        });

        if (!user) {
            res.redirect('/login')
        } else {
            const hashword = await bcrypt.compare(password, user.password)

            if (hashword) {
                req.session.userId = user.id
                req.session.userData = user

                console.log(user)

                res.redirect('/home');
            } else {
                res.redirect('/login')
            }
        }
    } else {
        res.redirect('/login')
    }
}

exports.testLogin = (req, res) => {
    console.log('test')
    res.render('viewHome')
}