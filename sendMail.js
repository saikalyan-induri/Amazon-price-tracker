const nodemailer = require('nodemailer');

require('dotenv').config();

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mailId,
        pass: process.env.password
    }
});
  
// let mailDetails = {
//     from: process.env.mailId,
//     to: 'saikalyaninduri@gmail.com',
//     subject: 'Test mail',
//     text: 'Node.js testing mail for GeeksforGeeks'
// };
  
// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs');
//     } else {
//         console.log('Email sent successfully');
//     }
// });

module.exports = mailTransporter;