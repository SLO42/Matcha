import  { Router } from 'express';
import { Query } from 'mongoose';

const router = Router();

const errorHandle = (val) => {
	console.log(`failed' ${val}' `);
};

router.get('/:format', async (req, res) => {
	const format = req.params.format;
	console.log(format);

	const params = format.split("_");
	const last = params.length - 1;
	let ammountOfValues = params.length - 2;
	const table = params[0];
	const ammount = params[last];
	let restrictGender = false;
	let restrictKey = "";
	let restrictVal = "";
	let restrict = {};
	let interstlist = [];

	let i = 1;
	let query = {};
	while (ammountOfValues-- >= 1){
		const param = params[i++];
		const values = param.split("=");
		const key = values[0];
		const value = values[1];
		
		// let meh = {};
		if (key === "mystats.mysex"){
			restrictGender = true;
			restrictKey = key;
			restrictVal = value;
			restrict[key] = value;
		}else if (key === "mystats.interest"){
			// meh[key] = value;
			interstlist.push(value);
			if (query[key]) {
				query[key] =  { '$all': interstlist};
			}
			query[key] = { '$all': interstlist};
		}
		else {
			query[key] = value;
		}
		console.log(key + " " + value + " " + ammountOfValues)
	}
	console.log(query);
	// console.log(restrict);
	if (restrictGender){
		if ((table === "profile" || table === "Profile")
			 && (ammount === "all" || amount === "All")){
			const results = await req.context.models.Profile.find(
				 restrict , 
				 {$or: query}  , function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile ${req.params.format} not found`)
						res.write(`profile ${req.params.format} not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						console.log(result);
						return res.send(result);
					}
				}
			)
		}
	} else {
		
		if ((table === "profile" || table === "Profile")
			 && (ammount === "all" || amount === "All")){
			const results = await req.context.models.Profile.find(
				query, function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile ${req.params.format} not found`)
						res.write(`profile ${req.params.format} not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				}
			)
		}
	}

})

export default router;