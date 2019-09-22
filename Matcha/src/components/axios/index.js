import {doMongoDBGetProfileWithAuth, doMongoDBGetGalleryWithAuth,
	doMongoDBGetUserWithAuthEmail, doUpdateGallery, doMongoDBGetUserWithAuthUsername,
} from './toprofilecard';
import {doMongoDBGetUserIdWithFireid, doMongoDBGetProfileWithUserid, doMongoDBGetProfileWithFireid} from './tofirebase';
import {doMongoDBCreateProfile, doMongoCreateGallery,
	doMongoDBGetUsers, doMongoDBCreateUser,
} from './tosignup';

import doGetUserFromUsername from './tosignin';
import Axios from 'axios';


const doSwipe = async (me, swiped) => {
	if (me.fireid){
		const table = process.env.REACT_APP_AXIOS_SWIPE;
		const body = {fireid: me.fireid, swiped};
		const res =  await Axios.put(table, body).then(res => {if (res) return res}).catch(err => {if (err) return err});
		return res;
	}else{
		return ("No");
	}
}
const getSwiped = async me => {
	if (me){
		const table = process.env.REACT_APP_AXIOS_GET_SWIPED;
		const res =  await Axios.get(table + `/${me}`).then(res => {if (res) return res}).catch(err => {if (err) return err});
		return res;
	}else{
		return ("No");
	}
}

const sendEmail = async body => {
	if (body.email){
		const table = process.env.REACT_APP_SEND_EMAIL;
		return await Axios.post(table, body).then(res => res).catch(err => {if (err) return err});
	} else return ("No");
}

export {doMongoDBGetProfileWithAuth,
		doMongoDBGetGalleryWithAuth,
		doMongoDBGetUserWithAuthEmail,
		doMongoDBCreateUser,
		doMongoDBCreateProfile,
		doMongoDBGetUsers,
		doMongoDBGetUserIdWithFireid,
		doMongoDBGetProfileWithUserid,
		doMongoDBGetProfileWithFireid,
		doGetUserFromUsername,
		doMongoCreateGallery,
		doUpdateGallery,
		doMongoDBGetUserWithAuthUsername,
		doSwipe,
		getSwiped,
		sendEmail,
	};