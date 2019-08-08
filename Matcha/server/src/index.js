import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import Machine from 'docker-machine';

import models, { connectDb } from './models';
import install from './install';
import routes from './routes';


const machine = new Machine();
// Variable to reset the database to defaults on errors
// or just because we want a wipe.
// look below for the automaticly created users and stuff.

const eraseDatabaseOnSync = ( process.env.DATABASE_RESET_ON_RESTART  === "false" ? false : true );

if (eraseDatabaseOnSync === true ){
	console.log("Reset on Database");
}
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

// Connects to Database container and starts to listen.
const runServer = async () => {
	await connectDb().then(async () => {
		if (eraseDatabaseOnSync) {
			await install();
		};
	
		// lets the express server listen on port (opens backend)
		app.listen(process.env.NODE_SERVER_PORT, () => 
			console.log(`Server running on port ${process.env.NODE_SERVER_PORT}`),
		);
	})
}
/* 
** DOCKER CHECK/START --- SERVER LISTEN 
*/
// Checks to see if the Docker-Machine Default is running and if not than to start it.
machine.isRunning(async (err, running) => {
	if (err){
		console.log(err);
	}
	if (running === true){
		console.log("Docker Machine is running");
		runServer();
	} else {
		console.log("Docker Machine is not running");
		console.log("starting Docker-Machine Default");
		await machine.start(async (err) => {
			if (err){
				console.log(err);
				throw err;
			}
			await console.log("DockerMachine Started");
			// change num to fit the good time
			await setTimeout(async () => { await runServer();}, 3000);
		})
	}
});

// Connects To MongoDB (Dockerized) and starts the express 
// server after successfully connecting to MongoDB
// connectDb().then(async () => {
// 	if (eraseDatabaseOnSync) {
// 		await install();
// 	};

// 	// lets the express server listen on port (opens backend)
// 	app.listen(process.env.NODE_SERVER_PORT, () => 
// 		console.log(`Server running on port ${process.env.NODE_SERVER_PORT}`),
// 	);
// })
// Testing index.js (will run regardless if server starts)
console.log('Hello Node.js project.');
