const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('viewLogin');
   
}

exports.postLogin = async (req, res) => {

    if (req.body.email && req.body.password){        
        
        const {email, password} = req.body;
        console.log(email, password)

        const user = await prisma.user_Data.findUnique({
            where: {email}
        });

        const hashword = bcrypt.compare(password, user.password)

        if (user && hashword) {
            req.session.userId = user.id
            req.session.userData = user

            console.log(user)

            res.redirect('/home');
        } else {
            res.render('viewlogin');
        }

    }
}

exports.testLogin = (req,res) => {
    console.log('test')
    res.render('viewHome')
}