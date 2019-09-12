import axios from 'axios';

// log content from this file


export const doMongoDBCreateUserWithEmailAndAuth = (email, authUser) => {
	const apiUserAdd = process.env.REACT_APP_AXOIS_ADD_USER;

	axios.post(apiUserAdd, {
		uid: authUser.uid,
		email,
	}).
	then(response => console.log(authUser.uid + " >| " + response)).
	catch(err => console.log(authUser.uid + " >| " + err));
}

async function doMongoDBGetUserIdWithFireid(fireId) {
	const apiGet = `${process.env.REACT_APP_AXIOS_GET_MONGOID}${fireId}`;
	let resi = "";
	await axios.get(apiGet).
	then(async res => {
		resi = res.data;
		return res.data}).
	catch(err => {return err});
	return resi;

}

async function doMongoDBGetProfileWithUserid(id){
	const table = `${process.env.REACT_APP_AXIOS_SEARCH_PROFILES}`;
	const request = `username=${id}_one`;
	let resi = {};
	await axios.get(table+request).
	then(async res => {
		resi = res.data;
		return res.data
	}).catch (err => {return err});
	return resi;
}

async function doMongoDBGetProfileWithFireid(fireid){
	const table = `${process.env.REACT_APP_AXIOS_SEARCH_PROFILES}`;
	const request = `fireid=${fireid}_one`;
	let resi = {};
	await axios.get(table+request).
	then(async res => {
		resi = res.data;
		return res.data
	}).catch (err => {return err});
	return resi;
}

export { doMongoDBGetUserIdWithFireid, doMongoDBGetProfileWithUserid, doMongoDBGetProfileWithFireid};


