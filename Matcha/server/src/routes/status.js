import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const server = await req.context.models.Status.find().where('name').all('server');
	return res.send(server);
})


router.put('/update', async (req, res) => {
	let server = await req.context.models.Status.findOne().where('name').all('server');
	// server.online.push(req.context.me.username);
	let todo = true;
	const toFind = req.context.me.username;
	
	// console.log(`to find: ` + toFind);
	server.online.map((user, index) => {
		if (toFind === user){
			todo = false;
		}
	});
	if(todo){
		server.online.push(toFind);
		await server.save();
		return res.send("Successful Status update for: " + toFind);
	}
	
	return res.send("No Change for: " + toFind);
})

router.put('/cleanup/all', async (req, res) => {
	let server = await req.context.models.Status.findOne().where('name').all('server');

	//add secruity and admin access later;
	server.online = ["server", "nouser"];
	await server.save();
	return (res.send("FULL CLEAN"));
})



router.put('/cleanup', async (req, res) => {
	let server = await req.context.models.Status.findOne().where('name').all('server');
	//add secruity and admin access later;

	let online = server.online;
	// const cleaned = online.reduce((accumulator, currentValue) => {
	// 	if (accumulator.indexOf(currentValue) === -1){
	// 		accumulator.push(currentValue);
	// 	}
	// 	return accumulator;
	// })
	// console.log("==BEFORE==");
	// console.log(server.online);

	server.online = Array.from(new Set(online));
	
	// console.log("==AFTER==");
	// console.log(server.online);
	// console.log("==FINISH==");
	await server.save();
	return res.send(server.online);

})

router.put('/delete', async (req, res) => {
	let server = await req.context.models.Status.findOne().where('name').all('server');
	const toFind = req.context.me.username
	server.online.map((user) => {
		if (user === toFind ){
			server.online = server.online.filter(name => name !== toFind)
			server.save();
		}
	})
	// server.online = online;
	return res.send("success")
	})

export default router;