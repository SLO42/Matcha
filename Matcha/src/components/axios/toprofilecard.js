import axios from 'axios';

// log content from this file

async function doMongoDBGetProfileWithAuth(auth){
	const apiTable = process.env.REACT_APP_AXIOS_SEARCH_PROFILES;
	const apiModify = process.env.REACT_APP_AXIOS_SEARCH_MODIFY_ONE;
	const apiUserToFind = `${apiTable}username=${auth}${apiModify}`;
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
}

async function doMongoDBGetUserWithAuthEmail(authUser){
	const apiTable = process.env.REACT_APP_AXIOS_SEARCH_USERS;
	const apiModify = process.env.REACT_APP_AXIOS_SEARCH_MODIFY_ONE;
	const email = authUser.email;
	const apiUserToFind = `${apiTable}email=${email}${apiModify}`;
	let result = {};
	await axios.get(apiUserToFind).
	then(async res => {
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
	let results = {};
	await axios.get(apiUserToFind).
	then(async res => {
		results = res.data;
		return(res.data);
	}).catch(err => {
		if (err) return err.status;
	});
	return results;
}

export {doMongoDBGetProfileWithAuth,
	doMongoDBGetGalleryWithAuth, 
	doMongoDBGetUserWithAuthEmail,
};