import axios from 'axios';

//log this file

async function doMongoDBCreateUser(username, email, id){
	const request = process.env.REACT_APP_AXIOS_ADD_USER;
	const access = {level: 0};
	const userObj = {fireid: id, username, email, access};

	axios.post(request, userObj).
	then(res => {
		// doMongoDBCreateProfileWithUsernameAndAuth(username, id, res.data._id);
		console.log(res)
		return res.data;
	}).
	catch(err => {if (err) return err});
}

async function doMongoDBCreateProfile(profObj){
	const request = process.env.REACT_APP_AXIOS_ADD_PROFILE;

	axios.post(request, profObj).
	then(res => console.log(res)).
	catch(err => {if (err) console.log(err)});
	console.log("or me");
}

async function doMongoDBGetUsers(){
	const apiTable = process.env.REACT_APP_AXIOS_GET_USERS_ALL;
	const apiUserToFind = `${apiTable}`;
	let result = {};
	// console.log("result");
	await axios.get(apiUserToFind).
	then(async res => {
		// console.log(res.data);
		result = res.data;
		return res.data;
	}).catch(err => {
		if (err) console.log(err.status);
	});
	return result;
}

async function doMongoCreateGallery(fireid, gallery){
	const apiTable = process.env.REACT_APP_AXIOS_CREATE_GALLERY;
	const galleryObj = {fireid, gallery};
	return await axios.post(apiTable, galleryObj).
	then(res => {return res}).
	catch(err => {if(err){console.log(err); return err;}});
}

export {doMongoDBCreateUser, 
	doMongoDBCreateProfile,
	doMongoDBGetUsers,
	doMongoCreateGallery,
};