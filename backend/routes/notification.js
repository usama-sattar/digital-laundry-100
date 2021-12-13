const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")
const smtpTransport = require('nodemailer-smtp-transport');

router.post("/sendMail", async (req,res)=>{
    //let testAccount = await nodemailer.createTestAccount();
    console.log(req.body.email)
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: "usamasattar1992@gmail.com", // generated ethereal user
            pass: "mynameisusama", // generated ethereal password
        },  
    });
    // send mail with defined transport object
    let mailOptions ={
        //from: '"NodeMailer" <usamasattar1992@gmail.com>', // sender address
        from: 'usamasattar1992@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Digital Laundry ✔", // Subject line
        text: "You have received a new order", // plain text body
        html: `<p>check your app to mark new orders</p>`, // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        cconsole.log("Message sent: %s", info.messageId + "mail sent");
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }})
})
module.exports = router;
