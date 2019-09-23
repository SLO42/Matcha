// import React, { Component } from 'react';
// import { Button } from '@material-ui/core';

// const nodemailer = require('nodemailer');

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.sendgrid.net',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'apikey', // generated ethereal user
//             pass: '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' // generated ethereal password
//         }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Spoopy 👻" <sam.olive.lee@gmail.com>', // sender address
//         to: 'pj259166@gmail.com', // list of receivers
//         subject: 'Hello ✔ GI', // Subject line
//         text: 'GO home?', // plain text body
//         html: '<b>Good Morning _______?</b>' // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }



// export default class SendNotificationEmail extends React.Component {
//     render() {
//         return(
//             <div>
//                 <p>CLICK TO SEND EMAIL</p>
//             <button
//             onClick={main}>
//             </button>
//             </div>
//         );
//     }
// }