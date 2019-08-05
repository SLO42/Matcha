import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';


// Variable to reset the database to defaults on errors
// or just because we want a wipe.
// look below for the automaticly created users and stuff.
const eraseDatabaseOnSync = process.env.DATABASE_RESET_ON_RESTART;

// This is the Backend server 
const app = express();

// ALLOWS us to read incoming requests VIA Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Enables CROSS ORIGIN RESOURCE SHARING
app.use(cors());

// this is my CUSTOM middleware, the thing that will handle auth 
// EVENTUALLY...
app.use( async (req, res, next) => {
	req.context = {
		models,
		me: await models.User.findByLogin('saolivei'),
	};
	next();
});

// Sets up API Routing : Check ./routes for these files
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/profiles', routes.profile);
app.use('/search', routes.search);

// Connects To MongoDB (Dockerized) and starts the express 
// server after successfully connecting to MongoDB
connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await Promise.all([
			models.User.deleteMany({}),
			models.Message.deleteMany({}),
			models.Profile.deleteMany({}),
		]);

		// this is where the automatic creation is.
		const createUsersWithMessages = async () => {
			const user1 = new models.User({
				username: 'saolivei',
				email: 'saolivei@student.42.us.org',
				access: {
					level: 5,
					group: "admin",
				}
			});

			const user2 = new models.User({
				username: `apickett`,
				email: 'apickett@student.42.us.org',
				access: {
					level: 5,
					group: "admin",
				}
			});
			const user3 = new models.User({
				username: `ssettle`,
				email: 'ssettle@student.42.us.org',
				access: {
					level: 1,
					group: "test",
				},
			});

			const message1 = new models.Message({
				text: 'Created from Erase on Sync',
				user: user1.id,
			});

			const message2 = new models.Message({
				text: 'Second message to be made. new stuff',
				user: user2.id,
			});

			const message3 = new models.Message({
				text: 'Created from Erase on Sync Message 3',
				user: user2.id,
			});

			const profile1 = new models.Profile({
				username: user1.username,
				firstname: 'Samuel',
				lastname: 'Oliveira',
				mystats: {
					bio: "This is my Temp Bio, Should be Editable Later",
					race: "Human",
					bodytype: "T H I C C",
					myheight: 420,
					myage: 22,
					mysex: "Male",
					interest: ["Smoking", "Gaming"],
				},
				wants: {
					prefheight: {min: 69, max: 420},
					prefage: {min: 69, max: 69},
					prefsex: "Female",
				},
				blocked: ["apickett"],
				reportedcount: 0,
				fame: 100,
			})

			const profile2 = new models.Profile({
				username: user3.username,
				firstname: 'sabrina',
				lastname: 'settle',
				mystats: {
					bio: "idk yet sorry",
					race: "Human",
					bodytype: "Blonde/Brunette/Ginger xD",
					myheight: 66,
					myage: 26,
					mysex: "Female",
					interest: ["Star Gazing", "Gaming", "Travel",
						"Coffee", "Shopping", "Reading",
						"Beer", "Karaoke", "Cooking", "Theatre"],
				},
				wants: {
					prefheight: {min: 68, max: 74},
					prefage: {min: 22, max: 28},
					prefsex: "Bisexual"
				},
				blocked: [],
				reportedcount: 0,
				fame: 100,
			});

			const profile3 = new models.Profile({
				username: user2.username,
				firstname: 'austin',
				lastname: 'picker',
				mystats: {
					bio: "idk yet sorry",
					race: "Human",
					bodytype: "Blonde/Brunette/Ginger xD",
					myheight: 66,
					myage: 26,
					mysex: "Male",
					interest: ["Star Gazing", "Gaming",
						"Coffee", "Shopping", "Reading",
						"Beer", "Karaoke", "Cooking", "Theatre"],
				},
				wants: {
					prefheight: {min: 68, max: 74},
					prefage: {min: 22, max: 28},
					prefsex: "Bisexual"
				},
				blocked: [],
				reportedcount: 0,
				fame: 100,
			});
			
			// await message1.save();
			// await message2.save();
			// await message3.save();

			await user1.save();
			await user2.save();
			await user3.save();

			await profile1.save();
			await profile2.save();
			await profile3.save();
		};
		// which is called here :shrug:
		createUsersWithMessages();
	};

	// lets the express server listen on port (opens backend)
	app.listen(process.env.NODE_SERVER_PORT, () => 
		console.log(`Server running on port ${process.env.NODE_SERVER_PORT}`),
	);
})
// Testing index.js (will run regardless if server starts)
console.log('Hello Node.js project.');
