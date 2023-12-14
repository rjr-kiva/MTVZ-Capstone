const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

exports.getLogin = (req, res) => {
    res.render('viewLogin', {purpose: "Login"});

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

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "mrfvillanuevajr@tip.edu.ph",
                        pass: "cnch xhad bruj qkrc",
                    },
                });
                
                const generateCode = generateString();

                const mailOptions = {
                    from: {
                        name: 'ECTAG',
                        address: "mrfvillanuevajr@tip.edu.ph"
                    },
                    to: [email],
                    subject: "Verify your Email",
                    text: "Hello world?",
                    html: "Verification Code: <b>" + generateCode + "</b>. "
                }

                const sendMail = async (transporter, mailOptions) => {
                    try {
                        await transporter.sendMail(mailOptions)
                        console.log("Email has been sent!")
                    } catch (error) {
                        console.error(error);
                    }
                }

                sendMail(transporter, mailOptions);

                req.session.generatedCode = generateCode

                req.session.userData = user

                res.render('viewLogin', {purpose: "Email Verification", user: user})
                

            } else {
                res.render('viewLogin', {purpose: "Login"})
            }
        }
    } else {
        res.redirect('/login')
    }
}

exports.verifyLogin = (req, res) => {

    const { verificationCode } = req.body;
    const code = req.session.generatedCode;

    const user = req.session.userData;
    console.log(user)

    if (verificationCode == code) {
        req.session.userId = user.id
        req.session.userData = user
        res.redirect('/home')
    } else {
        res.redirect('/login')
    }

    
}



function generateString() {

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}