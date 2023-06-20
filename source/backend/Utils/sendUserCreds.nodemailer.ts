// Imports
import nodemailer from "nodemailer";

interface userObj {
  username: string;
  password: string;
}

// Send User Creds through email
export async function sendNewUserCreds(email: string, user: userObj) {
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
    subject: "User Successfully Registered", // Subject line
    html: `<h1>User has been Successfully Registered</h1><div><h2>Your Login Credentials are:</h2><div><p><strong>Username :</strong> ${user.username}</p>
    <p><strong>Password :</strong> ${user.password}</p>
    </div><h2>Happy Reporting:)</h2>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
