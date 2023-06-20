// Imports
import nodemailer from "nodemailer";

// Send User Creds through email
export async function sendOtp(email: any, otp: number) {
  let transporter = nodemailer.createTransport({
    host: "mail.mailtest.radixweb.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "testdotnet@mailtest.radixweb.net", // generated ethereal user
      pass: "Radix@web#8", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "testdotnet@mailtest.radixweb.net", // sender address
    to: email, // list of receivers
    subject: "Login Otp", // Subject line
    html: `Your verification Otp is: ${otp}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
