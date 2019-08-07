import models from '../models';


// so so so // you want this or the docker stuff? //
// thats another api layer i do not want to implement on this project. but maybe
// my next one

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

	// because a map would be to hard/ i refrence them individually cause im a whore.
	// can fix later but its for debugging so idc

	const user1 = new models.User(userOptions[0]);
	const user2 = new models.User(userOptions[1]);
	const user3 = new models.User(userOptions[2]);
	const user4 = new models.User(userOptions[3]);
	const user5 = new models.User(userOptions[4]);
	const user6 = new models.User(userOptions[5]);
	const user7 = new models.User(userOptions[6]);
	const user8 = new models.User(userOptions[7]);
	const user9 = new models.User(userOptions[8]);
	const user10 = new models.User(userOptions[9]);
	const user11 = new models.User(userOptions[10]);
	const user12 = new models.User(userOptions[11]);
	const user13 = new models.User(userOptions[12]);
	const user14 = new models.User(userOptions[13]);
	const user15 = new models.User(userOptions[14]);
	const user16 = new models.User(userOptions[15]);
	const user17 = new models.User(userOptions[16]);
	const user18 = new models.User(userOptions[17]);
	const user19 = new models.User(userOptions[18]);
	const user20 = new models.User(userOptions[19]);
	const user21 = new models.User(userOptions[20]);
	const user22 = new models.User(userOptions[21]);
	const user23 = new models.User(userOptions[22]);
	const user24 = new models.User(userOptions[23]);
	const user25 = new models.User(userOptions[24]);
	const user26 = new models.User(userOptions[25]);
	const user27 = new models.User(userOptions[26]);
	const user28 = new models.User(userOptions[27]);
	const user29 = new models.User(userOptions[28]);

	// Profiles man....
	// just like yeah...

	const profileOptions = [
		{ username: user1.username, firstname: 'Samuel', lastname: 'Oliveira',
			mystats: {
				bio: "This is my Temp Bio, Should be Editable Later",
				race: "Human", bodytype: "T H I C C", myheight: 420,
				myage: 22, mysex: "Male", interest: ["Smoking", "Gaming"],
			},
			wants: {
				prefheight: {min: 69, max: 420},
				prefage: {min: 69, max: 69},
				prefsex: "Female",
			},
			blocked: ["apickett"], reportedcount: 0, fame: 100,
		},
		{ username: user2.username, firstname: 'austin', lastname: 'picker',
			mystats: {
				bio: "idk yet sorry",
				race: "Human", bodytype: "Blonde/Brunette/Ginger xD",
				myheight: 66, myage: 26, mysex: "Male",
				interest: ["Star Gazing", "Gaming",
					"Coffee", "Shopping", "Reading",
					"Beer", "Karaoke", "Cooking", "Theatre"],
			},
			wants: {
				prefheight: {min: 68, max: 74},
				prefage: {min: 22, max: 28},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 100,
		},
		{ username: user3.username, firstname: 'sabrina', lastname: 'settle',
			mystats: {
				bio: "idk yet sorry",
				race: "Human", bodytype: "Blonde/Brunette/Ginger xD",
				myheight: 66, myage: 26, mysex: "Female",
				interest: ["Star Gazing", "Gaming", "Travel",
					"Coffee", "Shopping", "Reading",
					"Beer", "Karaoke", "Cooking", "Theatre"],
			},
			wants: {
				prefheight: {min: 68, max: 74},
				prefage: {min: 22, max: 28},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 100,
		},
		{ username: user4.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "short", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Camping"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user5.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Jock", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Coffee"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user6.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Beer"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user7.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Otter", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Wine Tasting"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user8.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "T H I C C", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Gaming"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user9.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "thin mint", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Karaoke"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user10.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Daddy", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Religion"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user11.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Athletic", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Shopping"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user12.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Athletic", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Star Gazing"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user13.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Athletic", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Running"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user14.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Athletic", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Handicap Access"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user15.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Travel"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user16.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Theatre"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user17.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Cooking"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user18.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Biking", "Fishing", "Camping", "Hunting"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user19.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Fishing"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user20.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Smoking"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user21.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Concerts"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user22.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Hunting"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user23.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Reading"] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user24.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Camping", "Coffee", "Beer", "Wine Tasting", "Gaming",
					"Karaoke", "Religion", "Shopping", "Star Gazing", "Running", 
					"Handicap Access", "Travel", "Theatre", "Cooking", "Biking", 
					"Fishing", "Smoking", "Concerts", "Hunting", "Reading", ] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user25.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Camping", "Coffee", "Beer", "Wine Tasting", "Gaming",
					"Karaoke", "Religion", "Shopping", "Star Gazing", "Running", 
					"Handicap Access", "Travel", "Theatre", "Cooking", "Biking", 
					"Fishing", "Smoking", "Concerts", "Hunting", "Reading", ] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Bisexual"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user26.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Camping", "Coffee", "Beer", "Wine Tasting", "Gaming",
					"Karaoke", "Religion", "Shopping", "Star Gazing", "Running", 
					"Handicap Access", "Travel", "Theatre", "Cooking", "Biking", 
					"Fishing", "Smoking", "Concerts", "Hunting", "Reading", ] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user27.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Male",
				interest: ["Camping", "Coffee", "Beer", "Wine Tasting", "Gaming",
					"Karaoke", "Religion", "Shopping", "Star Gazing", "Running", 
					"Handicap Access", "Travel", "Theatre", "Cooking", "Biking", 
					"Fishing", "Smoking", "Concerts", "Hunting", "Reading", ] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user28.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Camping", "Coffee", "Beer", "Wine Tasting", "Gaming",
					"Karaoke", "Religion", "Shopping", "Star Gazing", "Running", 
					"Handicap Access", "Travel", "Theatre", "Cooking", "Biking", 
					"Fishing", "Smoking", "Concerts", "Hunting", "Reading", ] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Male"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
		{ username: user29.username, firstname: "Default", lastname: "Bot",
			mystats: {
				bio: "I'm just a test bot! Created by Default for testing! <3",
				race: "Human", bodytype: "Tall", myheight: 42, myage: 42, mysex: "Female",
				interest: ["Camping", "Coffee", "Beer", "Wine Tasting", "Gaming",
					"Karaoke", "Religion", "Shopping", "Star Gazing", "Running", 
					"Handicap Access", "Travel", "Theatre", "Cooking", "Biking", 
					"Fishing", "Smoking", "Concerts", "Hunting", "Reading", ] 
			},
			wants: {
				prefheight: {min: 69, max: 99}, prefage: {min: 20, max: 99},
				prefsex: "Female"
			},
			blocked: [], reportedcount: 0, fame: 0,
		},
	]

	const profile1 = new models.Profile(profileOptions[0]);
	const profile2 = new models.Profile(profileOptions[1]);
	const profile3 = new models.Profile(profileOptions[2]);
	const profile4 = new models.Profile(profileOptions[3]);
	const profile5 = new models.Profile(profileOptions[4]);
	const profile6 = new models.Profile(profileOptions[5]);
	const profile7 = new models.Profile(profileOptions[6]);
	const profile8 = new models.Profile(profileOptions[7]);
	const profile9 = new models.Profile(profileOptions[8]);
	const profile10 = new models.Profile(profileOptions[9]);
	const profile11 = new models.Profile(profileOptions[10]);
	const profile12 = new models.Profile(profileOptions[11]);
	const profile13 = new models.Profile(profileOptions[12]);
	const profile14 = new models.Profile(profileOptions[13]);
	const profile15 = new models.Profile(profileOptions[14]);
	const profile16 = new models.Profile(profileOptions[15]);
	const profile17 = new models.Profile(profileOptions[16]);
	const profile18 = new models.Profile(profileOptions[17]);
	const profile19 = new models.Profile(profileOptions[18]);
	const profile20 = new models.Profile(profileOptions[19]);
	const profile21 = new models.Profile(profileOptions[20]);
	const profile22 = new models.Profile(profileOptions[21]);
	const profile23 = new models.Profile(profileOptions[22]);
	const profile24 = new models.Profile(profileOptions[23]);
	const profile25 = new models.Profile(profileOptions[24]);
	const profile26 = new models.Profile(profileOptions[25]);
	const profile27 = new models.Profile(profileOptions[26]);
	const profile28 = new models.Profile(profileOptions[27]);
	const profile29 = new models.Profile(profileOptions[28]);

	await user1.save();
	await user2.save();
	await user3.save();
	await user4.save();
	await user5.save();
	await user6.save();
	await user7.save();
	await user8.save();
	await user9.save();
	await user10.save();
	await user11.save();
	await user12.save();
	await user13.save();
	await user14.save();
	await user15.save();
	await user16.save();
	await user17.save();
	await user18.save();
	await user19.save();
	await user20.save();
	await user21.save();
	await user22.save();
	await user23.save();
	await user24.save();
	await user25.save();
	await user26.save();
	await user27.save();
	await user28.save();
	await user29.save();

	await profile1.save();
	await profile2.save();
	await profile3.save();
	await profile4.save();
	await profile5.save();
	await profile6.save();
	await profile7.save();
	await profile8.save();
	await profile9.save();
	await profile10.save();
	await profile11.save();
	await profile12.save();
	await profile13.save();
	await profile14.save();
	await profile15.save();
	await profile16.save();
	await profile17.save();
	await profile18.save();
	await profile19.save();
	await profile20.save();
	await profile21.save();
	await profile22.save();
	await profile23.save();
	await profile24.save();
	await profile25.save();
	await profile26.save();
	await profile27.save();
	await profile28.save();
	await profile29.save();

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