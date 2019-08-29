import { Router } from 'express';

// This File is Used to handle all incoming /user/... api
// Requests. 

const router = Router();

//GET request to pull the entire list of users

router.get('/', async (req, res) => {
	const users = await req.context.models.User.find();
	return res.send(users);
});

router.get('/checkusers', async (req, res) => {
	const users = await req.context.models.User.find({}, {username: 1, _id: 0});
	return res.send(users);
});

router.get('/getid/:fireid', async (req, res) => {
	const user = await req.context.models.User.findOne({},  {fireid: 1}).
	where('fireid').all(req.param.fireid);
	return res.send(user._id);
})
//Post request to add User info to database. 

router.post('/add', async (req, res) => {

	let group = req.body.group;
	let level = 0;

	if (group === 'user'){
		level = 0;
	} else if (group === 'admin'){
		level = 5
	} else {
		group = "test";
		level = 1;
	};


	const user = await req.context.models.User.create({
		fireid: req.body.fireid,
		username: req.body.username,
		email: req.body.email,
		access: {
			group: group,
			level: level,
		}
	});
	return res.send(user);
})


// simple error handling for below request. stops the server from stoppin
const errorHandle = (val) => {
	console.log(`User with userid of '${val}' does not exist... `);
};


router.get('/findbyusername/:userId', async (req, res) => {
	const user = await req.context.models.User.find(
	{username: req.params.userId}, function (err, profile) {
		if (err) {
			errorHandle(req.params.userId);
			res.writeHead(301, `profile ${req.params.userId} not found`)
			res.write(`profile ${req.params.userId} not found`, (err) => {
				if (err) { console.log(err) };
			});
			return res.status(404).send("does not exist");
		} else {
			return res.send(profile);
		}
	}
	).exec(function (err) {
		if (err) {
			errorHandle(req.params.userId);
			res.writeHead(301, "no data")
			res.write("good stuff", (err) => {
				if (err) { console.log(err) };
			});
			return res.send();
		} else {
			return res.send(user);
		}
	})
});


// kinda buggy as it returns to backend server 
// and all requests are logged there. 
// the .exec is for if error. to protect from not locating
// requested user. aka user does not exist. will probably only
// be used for specific cases but like idk yet :shrug:

router.get('/findbyuserid/:userId', async (req, res) => {
	const user = await req.context.models.User.findById(
		req.params.userId, function (err, profile) {
			if (err) {
				errorHandle(req.params.userId);
				res.writeHead(301, `profile ${req.params.userId} not found`)
				res.write(`profile ${req.params.userId} not found`, (err) => {
					if (err) { console.log(err) };
				});
				return res.status(404).send("does not exist");
			} else {
				return res.send(profile);
			}
		}
	).exec(function (err) {
		if (err) {
			errorHandle(req.params.userId);
			res.writeHead(301, "no data")
			res.write("good stuff", (err) => {
				if (err) { console.log(err) };
			});
			return res.send();
		} else {
			return res.send(user);
		}
	})
});

export default router;