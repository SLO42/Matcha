import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const profiles = await req.context.models.Profile.find();
	return res.send(profiles);
});

router.post('/add', async (req, res) => {
	const profile = await req.context.models.Profile.create({
		fireid: req.body.fireid,
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		mystats: {
			myage:  req.body.myage,
			mysex: req.body.mysex,
			interest: req.body.interest,
			bio: req.body.bio,
		},
		wants: {
			prefage: req.body.prefage,
			prefsex: req.body.prefsex,
		},
		fame: 100,
		blocked: [],
		reportedcount: 0,
	});
	return res.send(profile);
})

router.put('/update', async (req, res) => {
	const profile = await req.context.models.Profile.findOne({'fireid': req.body.fireid});

	if (req.body.wants.prefage)
		profile.wants.prefage = req.body.wants.prefage;
	if (req.body.wants.prefsex)
		profile.wants.prefsex = req.body.wants.prefsex;
	if (req.body.mystats.bio)
		profile.mystats.bio = req.body.mystats.bio;
	if (req.body.mystats.interest)
		profile.mystats.interest = req.body.mystats.interest;
	if (req.body.mystats.mysex)
		profile.mystats.mysex = req.body.mystats.mysex;
	if (req.body.mystats.myage)
		profile.mystats.myage = req.body.mystats.myage;
	if (req.body.mystats.bodytype)
		profile.mystats.bodytype = req.body.mystats.bodytype;
	if (req.body.firstname)
		profile.firstname = req.body.firstname;
	if (req.body.lastname)
		profile.lastname = req.body.lastname;
	if (req.body.blocked)
		profile.blocked = req.body.blocked;
	if (req.body.reportedcount)
		profile.reportedcount = req.body.reportedcount;
	if (req.body.fame)
		profile.fame = req.body.fame;
	if (req.body.picture)
		profile.picture = req.body.picture;
	if (req.body.location){
		profile.location.lon = req.body.location.lon;
		profile.location.lat = req.body.location.lat;
	}
	await profile.save();
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

router.get('/searchbyfireid/:profileId', async (req, res) => {
	console.log(req.params.profileId);
	const user = await req.context.models.Profile.findOne(
		{fireid: req.params.profileId}, function (err, profile) {
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
router.get('/searchById/:profileId', async (req, res) => {
	console.log(req.params.profileId);
	const user = await req.context.models.Profile.findById(req.params.profileId).
		then(profile => {
			res.send(profile.data);
		}
	)
});

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