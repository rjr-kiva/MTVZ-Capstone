const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLogin = (req, res) => {
    
    res.render('viewLogin');
   
}

exports.postLogin = async (req, res) => {

    if (req.body.email && req.body.password){        
        
        const {email, password} = req.body;
        console.log(email, password)

        let user = await prisma.user_Data.findUnique({
            where: {email, password}
        });

        console.log(user)

        if (user) {
            req.session.userId = user.id
            req.session.userData = user
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