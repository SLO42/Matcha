import axios from 'axios';

// log content from this file

async function doMongoDBGetProfileWithAuth(auth){
	const apiTable = process.env.REACT_APP_AXIOS_SEARCH_PROFILES;
	const apiModify = process.env.REACT_APP_AXIOS_SEARCH_MODIFY_ONE;
	const apiUserToFind = `${apiTable}username=${auth}${apiModify}`;

	await axios.get(apiUserToFind).then(async res => {
		return res.data;
	}).catch(err => {
		if (err) return err;
	});
}

async function doMongoDBGetUserWithAuthEmail(authUser){
	const apiTable = process.env.REACT_APP_AXIOS_SEARCH_USERS;
	const apiModify = process.env.REACT_APP_AXIOS_SEARCH_MODIFY_ONE;
	const email = authUser.email;
	const apiUserToFind = `${apiTable}email=${email}${apiModify}`;
	let result = {};
	await axios.get(apiUserToFind).then(async res => {
		// console.log(res.data);
		result = res.data;
		return res.data;
	}).catch(err => {
		if (err) result = err.status;
	});
	return result;
}
async function doMongoDBGetUserWithAuthUsername(username){
	const apiTable = process.env.REACT_APP_AXIOS_SEARCH_USERS;
	const apiModify = process.env.REACT_APP_AXIOS_SEARCH_MODIFY_ONE;
	const apiUserToFind = `${apiTable}username=${username}${apiModify}`;
	let result = {};
	await axios.get(apiUserToFind).then(async res => {
		// console.log(res.data);
		result = res.data;
		return res.data;
	}).catch(err => {
		if (err) result = err.status;
	});
	return result;
}

async function doMongoDBGetGalleryWithAuth(authUser){
	const apiTable = process.env.REACT_APP_AXIOS_SEARCH_GALLERY;
	const apiModify = process.env.REACT_APP_AXIOS_SEARCH_MODIFY_ONE;
	const apiUserToFind = `${apiTable}username=${authUser.uid}${apiModify}`;
	return await axios.get(apiUserToFind).then(async res => {
		return(res.data);
	}).catch(err => {
		if (err) return err.status;
	});
}

async function doUpdateGallery(authUser, gallery){
	const table = process.env.REACT_APP_AXIOS_UPDATE_GALLERY;

	const body = {'fireid': authUser.uid, gallery};
	return axios.put(table, body).then(res => {return res }).catch(err => {if (err) return (err)});
}

export {doMongoDBGetProfileWithAuth,
	doMongoDBGetGalleryWithAuth, 
	doMongoDBGetUserWithAuthEmail,
	doUpdateGallery,
	doMongoDBGetUserWithAuthUsername,
};