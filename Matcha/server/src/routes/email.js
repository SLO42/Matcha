import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/send', async (req, res) => {

	let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'apikey', // generated ethereal user
            pass: 'KEY' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Matcha By Saolivei👻" <HOST>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔ Human', // Subject line
        text: 'GO home?', // plain text body
        html: '<b>You Have a Notification!</b>' // html body
    });
	return res.send(info);
})

export default router;
