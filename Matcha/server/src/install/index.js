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

	const userOptions = [
		{ username: 'saolivei', email: 'saolivei@student.42.us.org',
			access: { level: 5, group: "admin" 	}
		},
		{ username: `apickett`, email: 'apickett@student.42.us.org',
			access: { level: 5, group: "admin" 	}
		},
		{ username: `ssettle`, email: 'ssettle@student.42.us.org',
			access: { level: 0, group: "user", },
		},
		{ username: `AlphaBot a`, email: 'Alphabot_a@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot b`, email: 'Alphabot_b@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot c`, email: 'Alphabot_c@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot d`, email: 'Alphabot_d@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot e`, email: 'Alphabot_e@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot f`, email: 'Alphabot_f@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot g`, email: 'Alphabot_g@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot h`, email: 'Alphabot_h@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot i`, email: 'Alphabot_i@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot j`, email: 'Alphabot_a@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot k`, email: 'Alphabot_a@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot l`, email: 'Alphabot_l@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot m`, email: 'Alphabot_m@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot n`, email: 'Alphabot_n@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot o`, email: 'Alphabot_o@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot p`, email: 'Alphabot_a@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot q`, email: 'Alphabot_q@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot r`, email: 'Alphabot_r@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot s`, email: 'Alphabot_s@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot t`, email: 'Alphabot_t@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot u`, email: 'Alphabot_u@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot v`, email: 'Alphabot_v@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot w`, email: 'Alphabot_w@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot x`, email: 'Alphabot_x@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot y`, email: 'Alphabot_y@matcha.test.com',
			access: { level: 1, group: "test", },
		},
		{ username: `AlphaBot z`, email: 'Alphabot_z@matcha.test.com',
			access: { level: 1, group: "test", },
		}
	];

	userOptions.map(async (userObj) => {
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
		
		// console.log(interest);  // This is s consoleLOG!!!!!!!!!!!!!!!!!!!!!!
		// console.log(amountofinterest);
		const mystats = {
			bio: Math.random().toString(36) + Math.random().toString(36).substring(2, 25),
			race: "Human",
			myage, mysex, interest: interest,
		}
		const prefheigh = {min: 69, max: 420};
		const prefage = {min: `${Math.floor((Math.random(18) * 100) + 18)}`,
			max: `${Math.floor((Math.random(45) * 100) + 36)}`}
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
	]);
	await createStuff();
}

export default install;