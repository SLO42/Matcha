var express = require("express");
var router = express.Router();
// const nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail');

const key = "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";
sgMail.setApiKey(key);


router.get("/",  (req, res, next) => {
		var text = `<div>
		  <p>Not Spam spam mail thats just testing!</p>
		</div>`;
		


		const to = "saolivei@student.42.us.org";
		const from = "noreply@MatchaTeam.JustARandomlyLongEmailNameBecauseDontReplyIsBoring";
		const subject = "ChickenButt";
		console.log(to);
		const msg = {
		  to,
		  from,
		  subject,
		  text,
		  html: text
		};
		sgMail.send(msg, (err, inf) => {
			if (err){
				res.status(500).send(err);
			} else {

				res.status(200).send("success")
			}
		})
		.catch(err => console.log(err));
});


module.exports = router;
// 378918256776-mejun1qagv6o4rnv3ktrag8q2gvd58is.apps.googleusercontent.com

// ue2-dYjNCfGmfQQyaSDtNtR1

//  const user = 'sam.olive.lee@gmail.com';
		//  const clientId = '378918256776-mejun1qagv6o4rnv3ktrag8q2gvd58is.apps.googleusercontent.com';
		//  const clientSecret = 'ue2-dYjNCfGmfQQyaSDtNtR1';
		//  const refreshToken = '1/BoDh49eAYxrRp8OdKhsscmsE7HNsWaGNdI5IMKMyQfii7Dwn-F3qeEd5M8C6ZeRP';
		//  const accessToken = 'ya29.Gls8B4Ur3ALxhBezBwk0pmZG87_y85O0VdW1D-dFGOA_xxqi6AbUJ6FGPCF7ZkjwFlR_dreZaUPNK0Lob8xy_Fy8xYVbsMAm8Wv5IQIRhEeBoGuI1ROw-QPU9jkq';
	
		//  var transporter = nodemailer.createTransport({
		//   host: 'smtp.gmail.com',
		//   port: 465,
		//   secure: true,
		//   auth: {
		// 	  type: 'OAuth2',
		// 	  user,
		// 	  clientId,
		// 	  clientSecret,
		// 	  refreshToken,
		// 	  accessToken,
		//   }
		// });

	// const api_user = 'apikey';
	// const api_pass = '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';

	// var transporter = nodemailer.createTransport({
	// 	host: 'smtp.sendgrid.net',
	// 	port: 465,
	// 	secure: true,
	// 	auth: {
	// 		api_user,
	// 		api_pass,
	// 	}
	// });

	// transporter.
		// transporter.sendMail(mailOptions, function(error, info){
		//  if(error){
		// 	 console.log(error.message);
		// 	 res.status(500).send("error");
		//  }
		//  console.log(info);
		//  res.status(200).send("success")
		// });
