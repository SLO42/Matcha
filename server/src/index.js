import 'dotenv/config';
import uuidv4 from 'uuid/v4';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const eraseDatabaseOnSync = true;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cors());

// this is my CUSTOM middleware, the thing that will handle auth
app.use((req, res, next) => {
	req.context = {
		models,
		me: models.users[1],
	};
	next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await Promise.all([
			models.User.deleteMany({}),
			models.Message.deleteMany({}),
		]);

		createUsersWithMessages = async () => {
			const user1 = new models.User({
				username: 'saolivei',
			});

			const user2 = new models.User({
				username: `apickett`,
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
			
			await message1.save();
			await message2.save();
			await message3.save();

			await user1.save();
			await user2.save();
		};
	};

	app.listen(process.env.NODE_SERVER_PORT, () => 
		console.log(`Server running on port ${process.env.NODE_SERVER_PORT}`),
	);
})

console.log('Hello Node.js project.');
