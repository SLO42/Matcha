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

let numOfUpdates = -1;

app.use( async (req, res, next) => {
	// console.log("================ Body ================")
	// console.log(req.body)
	// console.log("===============^ Body ^===============")
	console.log("================ more ================")
	console.log("Request url: " + req['originalUrl']);
	let id = null;
	// console.log(req['originalUrl'])
	if (req['originalUrl'].indexOf('fireid=') !== -1 ){
		id = req['originalUrl'].slice(7 + req['originalUrl'].indexOf('fireid='), req['originalUrl'].lastIndexOf('_'))
	}
	else if (req['originalUrl'].indexOf('getid/') !== -1 ){
		id = req['originalUrl'].slice(6 + req['originalUrl'].indexOf('getid/'), req['originalUrl'].length)
	}
	else if (req.body && req.body['profile']){
		id = req.body['profile'].fireid;
	}
	else if (req.body && req.body['username']){
		id = req.body['username'];
	}
	else if (req.body && req.body['fireid']){
		id = req.body['fireid'];
	} else id = 101;
	if (req['originalUrl'].indexOf('swiped') !== -1 ){
		id = req['originalUrl'].slice(7 + req['originalUrl'].indexOf('swiped'), req['originalUrl'].length)
	}
	console.log("id = " +  id);
	console.log("===============^ more ^===============")
	req.context = {
		models,
		me: await models.User.findByLoginEmailUid(id),
	};
	
	let updated = false;
	let server = await req.context.models.Status.findOne().where('name').all('server');
	if (server){

		if ((req.body && req.body['username'])){
			// server.online.push(req.context.me.username);
			let todo = true;
			const toFind = req.body['username'];
			
			server.online.map((user) => {
				
				if (toFind === user){
				todo = false;
			}
			});
			if(todo){
				server.online.push(toFind);
				numOfUpdates++;
				updated = true;
			}
		}
		else if (req.context.me){
			// server.online.push(req.context.me.username);
			let todo = true;
			const toFind = req.context.me.username;
			
			server.online.map((user) => {

				if (toFind === user){
					todo = false;
				}
			});
			if(todo){
				server.online.push(toFind);
				numOfUpdates++;
				updated = true;
			}
		}
		if(numOfUpdates > 29 || numOfUpdates === -1){
			numOfUpdates = 0;
			server.online = ["server", "nouser"];
			updated = true;
		}
		if (updated){
			server.online = Array.from(new Set(server.online));
			await server.save().catch(
				err => {
					if (err) void(err);
				}
				);
			}
	}
	// console.log(req.context.me);
		next();
});

// Sets up API Routing : Check ./routes for these files
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/profiles', routes.profile);
app.use('/search', routes.search);
app.use('/gallery', routes.gallery);
app.use('/status', routes.status);
app.use('/report', routes.report);

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
		console.log("Docker Machine is already running\nStarting Backend Communication Server");
		runServer();
	} else {
		console.log("Docker Machine is not running");
		console.log("starting Docker-Machine Default");
		await machine.start(async (err) => {
			if (err){
				console.log(err);
				throw err;
			}
			await console.log("DockerMachine Started\nWaiting 5 seconds before Starting Backend Communication Server");
			// change num to fit the good time
			await setTimeout(async () => { await runServer();}, 5000);
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
