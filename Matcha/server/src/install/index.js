import models from '../models';


// so so so // you want this or the docker stuff? //
// thats another api layer i do not want to implement on this project. but maybe
// my next one

const shuffle = (array) => {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}


const createEverything = async () => {

	// for default user list

	let userOptions = [
		// { username: 'saolivei', email: 'saolivei@student.42.us.org',
		// 	access: { level: 5, group: "admin" 	}
		// },
		// { username: `apickett`, email: 'apickett@student.42.us.org',
		// 	access: { level: 5, group: "admin" 	}
		// },
		// { username: `ssettle`, email: 'ssettle@student.42.us.org',
		// 	access: { level: 0, group: "user", },
		// },
		{ fireid: 101, username: 'nouser', access: {level : -1, group: 'nonUser'}},
	];
	/*--> 
	** Bewarned that going further has rusulted in slow or no connectivity 
	** Please don't raise these numbers. they already make the result size 1.8mb
	<--*/
	let extra = 269;
	while(extra){
		const username = "AutoBot #" + extra--;
		const email = Math.random().toString(36).substring(2, 15) +  "@" + Math.random().toString(36).substring(2, 7) + ".com";
		let access = {};
		access["level"] = Math.floor(Math.random() * 10) % 5;
		if (access["level"] === 1 ) access["group"] = "test";
		else if (access["level"] === 2 ) access["group"] = "alpha";
		else if (access["level"] === 3 ) access["group"] = "beta";
		else if (access["level"] === 4 ) access["group"] = "kilo";
		else if (access["level"] === 0 ) access["group"] = "user";
		await userOptions.push({username, email, access});
	}

	await userOptions.map(async (userObj) => {
		const firstname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		const lastname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		const myage = Math.floor(Math.random(81) * 10) + 18;
		const mysex = Math.floor(Math.random(2) * 10) < 5 ? "Male" : "Female";
		const prefsexnum = Math.floor(Math.random(3) * 10);
		const prefsex = prefsexnum === 0 ? "Male" : prefsexnum === 1 ? "Female" : "Bisexual";
		const amountofinterest = Math.floor((Math.random(18) * 10));
		let interets = [
			"Camping", "Coffee", "Beer",
			"Wine Tasting","Gaming","Karaoke",
			"Religion","Shopping","Star Gazing","Running",
			"Handicap Access","Travel","Theatre","Cooking",
			"Biking","Fishing","Smoking",
			"Concerts","Hunting","Reading"];
		interets = shuffle(interets)
		const interest = interets.slice(0, amountofinterest);
		const mystats = {
			bio: Math.random().toString(36) + Math.random().toString(36).substring(2, 25),
			myage, mysex, interest: interest,
		}
		const prefheigh = {min: 69, max: 420};
		const num1 = Math.floor((Math.random(18) * 100) + 18);
		const num2 = Math.floor((Math.random(18) * 100) + 18);
		const min = num1 > num2 ? num2 : num1;
		const max = num1 > num2 ? num1 : num2;
		const prefage = {min, max}
		const wants = {
			prefheigh, prefage, prefsex
		}
		let user = new models.User(userObj);
		let profile = new models.Profile({
			username: user.username, firstname, lastname, mystats,
			wants, blocked: [], reportedcount: `${Math.floor(Math.random(6) * 100)}`,
			fame: `${Math.floor(Math.random(101) * 100)}`,
		})
		await user.save();
		await profile.save();
	})

	const samsGallery = new models.Gallery({
		username: 'saolivei',
		gallery: {0: "Dude its an image, trust", 1: "FirstImg", 2: "secondImg"}
	});
	await samsGallery.save();

};

const createStuff = async () => {
	// this is where the "automatic" creation is.
	await createEverything();
}
// const message1 = new models.Message({
// 	text: 'Created from Erase on Sync',
// 	user: user1.id,
// });

// const message2 = new models.Message({
// 	text: 'Second message to be made. new stuff',
// 	user: user2.id,
// });

// const message3 = new models.Message({
// 	text: 'Created from Erase on Sync Message 3',
// 	user: user2.id,
// });


const install = async () => {
	await Promise.all([
		models.User.deleteMany({}),
		models.Message.deleteMany({}),
		models.Profile.deleteMany({}),
		models.Gallery.deleteMany({}),
		models.Report.deleteMany({}),
	]);
	await createStuff();
}

export default install;