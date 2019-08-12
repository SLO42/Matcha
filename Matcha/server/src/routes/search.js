import  { Router } from 'express';

const router = Router();

const errorHandle = (val) => {
	console.log(`failed' ${val}' `);
};


/* 						SEARCH IS ONLY GET
** This File Handles localhost:PORT/search/:format 
** pretty much just means that if you want data you gotta follow the format...
** WHICH IS!!! 
** .../search/TABLE_INFO-TO-LOOK-FOR=VALUE_QUANITITY
** 		     p/P		u/U     r/R        g/G       b/B
** TABLE == Profile || User || Report || Gallery || Banned
** INFO-TO-LOOK-FOR == mystats.interst || mystats.mysex || access.level || access.group || username || email
** || reportie || reported.username
** VALYE == legit whatever you are looking for as long as it follow the correct I-T-L-F...
** QUANTITY == All || One
*/ 

router.get('/:format', async (req, res) => {
	const format = req.params.format;
	console.log(format);


	const params = format.split("_");
	const last = params.length - 1;
	const table = params[0];
	const qaunitity  = params[last];
	// let restrictKey = "";
	// let restrictVal = "";
	let interstList = [];
	let userToFind = null;
	let emailToFind = null;
	let gender = null;
	let accessLevel = -1;
	let accessGroup = null;
	let findReported = 0;

	let i = 1;
	let query = {};
	let ammountOfValues = params.length - 2;
	while (ammountOfValues-- >= 1){
		const param = params[i++];
		const values = param.split("=");
		const key = values[0];
		const value = values[1] ? values[1] : null;
		
		if (key === "mystats.mysex") gender = value;
		else if (key === "mystats.interest") interstList.push(value);
		else if (key === "access.level") accessLevel = parseInt(value)
		else if (key === "access.group") accessGroup = value;
		else if (key === "username") userToFind = value;
		else if (key === "email") emailToFind = value;
		else if (key === "reportie") userToFind = value;
		else if (key === "reported") {findReported = 1; userToFind = value;}
		console.log(key + " " + value + " " + ammountOfValues)
	}
	console.log(query);

	const ifPorifle = (table === "profile" || table === "Profile" || table === "p" || table === "P");
	const ifUser = (table === "user" || table === "User" || table === "u" || table === "U");
	const ifGallery = (table === "gallery" || table === "Gallery" || table === "g" || table === "G");
	const ifReport = (table === "report" || table === "Report" || table === "r" || table === "R");
	const ifBanned = (table === "Banned" || table === "banned" || table === 'b' || table === "B");
	const qaunitityAll = (qaunitity === "all" || qaunitity === "All");
	const qaunitityOne = (qaunitity === "one" || qaunitity === "One");

	/*
	** Ready for the biggest Copy Paste of your life?
	** Lets Start with some basics
	**
	**	This here is going to be the Profile_All Sections
	**	This covers all searches that start with profile and end with all
	*/

	if (ifPorifle && qaunitityAll){
		if (interstList[0]){
			if (gender){
				console.log("Request for Interests and Gender")
				const searchProfileForInterstAndGenderAll = await req.context.models.Profile.find().
					where('mystats.interest').all(interstList).
					where('mystats.mysex').all(gender).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else {
				console.log("Request for Only Interests")
				const searchProfileForInterstAll = await req.context.models.Profile.find().
					where('mystats.interest').all(interstList).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
		} else {
				console.log("Request for Gender")
				if (gender){
					const searchProfileForGenderAll = await req.context.models.Profile.find().
						where('mystats.mysex').all(gender).
						exec(function (err, result) {
							if (err) {
								errorHandle(req.params.format);
								res.writeHead(301, `profile  not found`)
								res.write(`profile not found`, (err) => {
									if (err) { console.log(err) };
								});
								return res.status(404).send("does not exist");
							} else {
								return res.send(result);
							}
						})
				} else if (userToFind) {
					console.log("Request profile via username")
					const searchProfileForUserAll = await req.context.models.Profile.find().
						where('username').all(userToFind).
						exec(function (err, result) {
							if (err) {
								errorHandle(req.params.format);
								res.writeHead(301, `profile  not found`)
								res.write(`profile not found`, (err) => {
									if (err) { console.log(err) };
								});
								return res.status(404).send("does not exist");
							} else {
								return res.send(result);
							}
						})
				} else {
					console.log("Request all Profiles")
					const searchProfileForAll = await req.context.models.Profile.find().
						exec(function (err, result) {
							if (err) {
								errorHandle(req.params.format);
								res.writeHead(301, `profile  not found`)
								res.write(`profile not found`, (err) => {
									if (err) { console.log(err) };
								});
								return res.status(404).send("does not exist");
							} else {
								return res.send(result);
							}
						})
				}
			}
	}
	else if (ifPorifle && qaunitityOne){
		if (interstList[0]){
			if (gender){
				console.log("Request for Interests and Gender")
				const searchProfileForInterstAndGenderOne = await req.context.models.Profile.findOne().
					where('mystats.interest').all(interstList).
					where('mystats.mysex').all(gender).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else {
				console.log("Request for Only Interests")
				const searchProfileForInterstOne = await req.context.models.Profile.findOne().
					where('mystats.interest').all(interstList).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
		} else {
			console.log("Request for Gender")
			if (gender){
				const searchProfileForGenderOne = await req.context.models.Profile.findOne().
					where('mystats.mysex').all(gender).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else if (userToFind) {
				console.log("Request profile via username")
				const searchProfileForUserOne = await req.context.models.Profile.findOne().
					where('username').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}else {
				console.log("Request all info")
				const searchProfileForOne = await req.context.models.Profile.findOne().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
				}
			}
	}
	/*
	**	This here is going to be the User Sections
	**	This covers all searches that start with user
	**  We now Search for userful info such ass access level or group as well as 
	**	username and email. so like its pretty good. i'll add id just in case.. maybe...
	*/
	else if (ifUser && qaunitityAll){
		if (userToFind){
			console.log("Request for Username")
			const searchUserForUserAll = await req.context.models.User.find().
				where('username').all(userToFind).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else if ( emailToFind ){
			console.log("Request for Email")
			const searchUserForEmailAll = await req.context.models.User.find().
				where('email').all(emailToFind).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else if ( accessLevel !== -1 ) {
			console.log("Request for Access Level")
			const searchUserForAccessLevelAll = await req.context.models.User.find().
				where('access.level').all(accessLevel).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else if ( accessGroup ){
			console.log("Request for access Group")
			const searchUserForAccessGroupAll = await req.context.models.User.find().
				where('access.group').all(accessGroup).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else {
			console.log("looking for anyinfo");
			const searchUserForAll = await req.context.models.User.find().
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		}
	/*
	**
	**	This here is going to be the User_One Sections
	**	This covers all searches that start with User and end with one
	**  Same thing as last time but with FindOne
	*/
	}
	else if (ifUser && qaunitityOne){
		if (userToFind){
			console.log("Request for Username")
			const searchUserForUserOne = await req.context.models.User.findOne().
				where('username').all(userToFind).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else if ( emailToFind ){
			console.log("Request for Email")
			const searchUserForEmailOne = await req.context.models.User.findOne().
				where('email').all(emailToFind).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else if ( accessLevel !== -1 ) {
			console.log("Request for Access Level")
			const searchUserForAccessLevelOne = await req.context.models.User.findOne().
				where('access.level').all(accessLevel).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
		} else if ( accessGroup ){
			console.log("Request for access Group")
			const searchUserForAccessGroupOne = await req.context.models.User.findOne().
				where('access.group').all(accessGroup).
				exec(function (err, result) {
					if (err) {
						errorHandle(req.params.format);
						res.writeHead(301, `profile  not found`)
						res.write(`profile not found`, (err) => {
							if (err) { console.log(err) };
						});
						return res.status(404).send("does not exist");
					} else {
						return res.send(result);
					}
				})
			}
			else {
				console.log("looking for anyinfo");
				const searchUserForOne = await req.context.models.User.findOne().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	}
	/*
	**	This here is going to be the Gallery Sections
	**	This covers all searches that start with Gallery
	**  We now Search for username of the user gallery we want.
	*/
	else if (ifGallery && qaunitityAll){
			if (userToFind){
				console.log("Request Gallery for Username")
				const searchGalleryForUserAll = await req.context.models.Gallery.find().
					where('username').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
			else {
				console.log("Request Gallery")
				const searchGalleryForAll = await req.context.models.Gallery.find().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	}
	else if (ifGallery && qaunitityOne){
			if (userToFind){
				console.log("Request Gallery for Username")
				const searchGalleryForUserOne = await req.context.models.Gallery.findOne().
					where('username').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
			else {
				console.log("Request Gallery")
				const searchGalleryForOne = await req.context.models.Gallery.findOne().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	}
	/*
	**	This here is going to be the Report Sections
	**	This covers all searches that start with Report
	**  We now Search for reportie (user who reported) and
	**	the Reported of the user report we want.
	*/
	else if (ifReport && qaunitityAll){
			if (findReported) {
				console.log("Request for reported")
				const searchReportForReportedUserAll = await req.context.models.Report.find().
					where('reported.username').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else if (userToFind){
				console.log("Request for reportie")
				const searchReportForReportieUserAll = await req.context.models.Report.find().
					where('reportie').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else {
				console.log("Request for all reports")
				const searchReportForAll = await req.context.models.Report.find().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	}
	else if (ifReport && qaunitityOne) {
			if (findReported) {
				console.log("Request for reported")
				const searchReportForReportedUserOne = await req.context.models.Report.findOne().
					where('reported.username').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else if (userToFind){
				console.log("Request for reportie")
				const searchReportForReportieUserOne = await req.context.models.Report.findOne().
					where('reportie').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			} else {
				console.log("Request for all reports")
				const searchReportForOne = await req.context.models.Report.findOne().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	}
	/*
	**	This here is going to be the Banned Sections
	**	This covers all searches that start with Banned
	**  We now Search for username or email of the banned user we want.
	**	will add a search for reason feature so you can look for all users
	**	whom violated a specfic thing.
	*/
	else if (ifBanned && qaunitityAll){
			if (userToFind){
				console.log("Request for Username")
				const searchBannedUserAll = await req.context.models.BannedUsers.find().
					where('user').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
			else if (emailToFind){
				console.log("Request for Email")
				const searchBannedEmailAll = await req.context.models.BannedUsers.find().
					where('email').all(emailToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
			else {
				console.log("Request for all Banned")
				const searchBannedAll = await req.context.models.BannedUsers.find().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	} 
	else if (ifBanned && qaunitityOne){
			if (userToFind){
				console.log("Request for Username")
				const searchBannedUserOne = await req.context.models.BannedUsers.findOne().
					where('user').all(userToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
			else if (emailToFind){
				console.log("Request for Email")
				const searchBannedEmailOne = await req.context.models.BannedUsers.findOne().
					where('email').all(emailToFind).
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
			else {
				console.log("Request for all Banned")
				const searchBannedOne = await req.context.models.BannedUsers.findOne().
					exec(function (err, result) {
						if (err) {
							errorHandle(req.params.format);
							res.writeHead(301, `profile  not found`)
							res.write(`profile not found`, (err) => {
								if (err) { console.log(err) };
							});
							return res.status(404).send("does not exist");
						} else {
							return res.send(result);
						}
					})
			}
	}
		// add stuff here following the above format/
})
			// const results = await req.context.models.Profile.find(
			// 	// { $and: [ {$all: interstlistRequired }, { $or: interstlistOptional}] }
			// 	query
			// , function (err, result) {
			// 	if (err) {
			// 		errorHandle(req.params.format);
			// 		res.writeHead(301, `profile ${req.params.format} not found`)
			// 		res.write(`profile ${req.params.format} not found`, (err) => {
			// 			if (err) { console.log(err) };
			// 		});
			// 		return res.status(404).send("does not exist");
			// 	} else {
			// 		return res.send(result);
			// 	}
			// }
			// )
	// 	}

export default router;