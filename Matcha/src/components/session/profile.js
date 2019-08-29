import React from 'react';
import { doMongoDBCreateUserAndProfileWithEmailAndAuth,
	doMongoDBGetProfileWithAuth,
} from '../axios';

class Profile {
	constructor() {
	}

	

	// doGetProfileWithAuth = (username) => {
	// 	// doMongoDBGetProfileWithAuth(username).
	// 	// then(async (res) => {
	// 	// 	setTimeout(() => {
	// 	// 		console.log(res);
	// 	// 		this.profile = res;
	// 	// 		return res;
	// 	// 	}, 2000);
	// 	// 	console.log(this.profile);
	// 	// })
	// }
	// doGetProfile = (username) => this.doGetProfileWithAuth(username);
}

export default Profile;
