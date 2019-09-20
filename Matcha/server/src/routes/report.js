import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const table = await req.context.models.Report.find();

	if (!table) return ("No Reports for this user");
	else return res.send(table);
})

router.put('/add', async (req, res) => {
	const table = await req.context.models.Report.findOne().
	where("reportie").all(req.context.me.username);

	if (table){
		let item = {username: req.body.user, reason: req.body.reason};
		table.reported.push(item);
		await table.save();
	} else{
		let newTable = {
			reportie: req.context.me.username,
			reported: [{username: req.body.user, reason: req.body.reason}]
		}
		const report = new req.context.models.Report(newTable);
		await report.save();
	}
	let profile = await req.context.models.Profile.findOne().where("username").all(req.body.user);
	if(profile){
		profile.reportedcount = profile.reportedcount + 1;
		await profile.save();
	}
	return res.send("probably");
})

export default router;