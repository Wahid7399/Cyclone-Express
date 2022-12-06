const nodemailer = require("nodemailer");
module.exports=   async function (pin,emial) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service:"gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "muhammadwahid9938@gmail.com", // generated ethereal user
        pass: "ctzojitpfvydtrvv", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'muhammadwahid9938@gmail.com', // sender address
      to: emial, // list of receivers
      subject: "Verification", // Subject line
      text: "Cyclone Express Verification code", // plain text body
      html: "<b>You OTP is "+pin+"</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
