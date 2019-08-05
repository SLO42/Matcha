import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const profiles = await req.context.models.Profile.find();
	return res.send(profiles);
});

router.post('/add', async (req, res) => {
	const profile = await req.context.models.Profile.create({
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		mystats: {
			race: req.body.race,
			bodytype: req.body.bodytype,
			myheight: req.body.myheight,
			myage:  req.body.myage,
			mysex: req.body.mysex,
			interest: req.body.interest,
			bio: req.body.bio,
		},
		wants: {
			prefheight: req.body.prefheight,
			prefage: req.body.prefage,
			prefsex: req.body.prefsex,
		},
		fame: 100,
		blocked: [],
		reportedcount: 0,
	});
	return res.send(profile);
})

const errorHandle = (val) => {
	console.log(`User with userid of '${val}' does not exist... `);
};


// http://localhost:3001/profiles/searchbygender/male
// http://localhost:3001/profiles/searchbygender/female
// using the above links to sort by gender. should in theory give you the many

router.get('/searchbygender/:gender', async (req, res) => {
	const profile = await req.context.models.Profile.find(
		{"mystats.mysex": req.params.gender}, function (err, profile) {
			if (err) {
				errorHandle(req.params.gender);
				res.writeHead(301, `profile ${req.params.gender} not found`)
				res.write(`profile ${req.params.gender} not found`, (err) => {
					if (err) { console.log(err) };
				});
				return res.status(404).send("does not exist");
			} else {
				return res.send(profile);
			}
		}
	)
})

// http://localhost:3001/profiles/searchbyinterest/Travel    
// using the above links to sort by interests. should in theory give you the many

router.get('/searchbyinterest/:interestName', async (req, res) => {
	const profile = await req.context.models.Profile.find(
		{"mystats.interest": req.params.interestName}, function (err, profile) {
			if (err) {
				errorHandle(req.params.interestName);
				res.writeHead(301, `profile ${req.params.interestName} not found`)
				res.write(`profile ${req.params.interestName} not found`, (err) => {
					if (err) { console.log(err) };
				});
				return res.status(404).send("does not exist");
			} else {
				return res.send(profile);
			}
		}
	)
})

// http://localhost:3001/profiles/searchbyname/saolivei
// using the above links to sort by Name. if the users exists then youll be given
// the json of the user found. should only be used when on a specific profile or
// if you have already matched.

router.get('/searchbyname/:profileId', async (req, res) => {
	const user = await req.context.models.Profile.findOne(
		{username: req.params.profileId}, function (err, profile) {
			if (err) {
				errorHandle(req.params.profileId);
				res.writeHead(301, `profile ${req.params.profileId} not found`)
				res.write(`profile ${req.params.profileId} not found`, (err) => {
					if (err) { console.log(err) };
				});
				return res.status(404).send("does not exist");
			} else {
				return res.send(profile);
			}
		}
	)
});

export default router;