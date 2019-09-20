import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Profile from '../session/profile';
import {doMongoDBGetUserIdWithFireid,
	doMongoDBCreateUser,
	doMongoDBGetProfileWithFireid,
	doMongoDBCreateProfile,
} from '../axios';
import Axios from 'axios';

/* import * as admin from 'firebase-admin';

 var serviceAccount = require("REACT_APP_GOOGLE_APPLICATION_CREDENTIALS");


console.log(admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "REACT_APP_FIREBASE_ADMIN_DB",
})); */

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

  class Firebase {
    constructor() {
      firebase.initializeApp(firebaseConfig);
      this.auth = firebase.auth();
       this.db = firebase.database();
      this.serverValue = firebase.database.ServerValue;
      this.emailAuthProvider = firebase.auth.EmailAuthProvider;
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
      this.facebookProvider = new firebase.auth.FacebookAuthProvider();
	  this.twitterProvider = new firebase.auth.TwitterAuthProvider();
	  this.profile = new Profile();
    };
  
doDatabaseCreateUser = (username, email, uid) => 
	doMongoDBCreateUser(username ,email, uid);

doCreateUserWithEmailAndPassword = (email, password) =>
	this.auth.createUserWithEmailAndPassword(email, password);

doSignInWithEmailAndPassword = (email, password) =>
this.auth.signInWithEmailAndPassword(email, password);


doBlockUser = (user) => {

	doMongoDBGetProfileWithFireid(this.auth.currentUser.uid).then(
		res => {
			let list = res.blocked;
			if (!list.includes(user)){
				list.push(user);
				const update = {fireid: this.auth.currentUser.uid, blocked: list};
				const table = process.env.REACT_APP_AXIOS_UPDATE_PROFILE;
				Axios.put(table, update).then(
					res => { }).catch(err => {if (err) return err})
			}
		}
	)
}

doReportUser = (user, reason) => {

	const table = process.env.REACT_APP_AXIOS_ADD_REPORT;
	const add = {
		fireid: this.auth.currentUser.uid,
		user,
		reason,
	}
	Axios.put(table, add).then(res => {console.log(res)}).catch(err => {if (err) return err});
	
}
/* doSignInWithGoogle = () =>
this.auth.signInWithPopup(this.googleProvider);

doSignInWithFacebook = () =>
this.auth.signInWithPopup(this.facebookProvider);

doSignInWithTwitter = () =>
this.auth.signInWithPopup(this.twitterProvider); */

doSignOut = () => this.auth.signOut();

doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

doSendEmailVerification = () =>
this.auth.currentUser.sendEmailVerification({
  url: 'https://www.localhost:3000',
});

doEmailUpdate = email =>
this.auth.currentUser.updateEmail(email);

doPasswordUpdate = password =>
this.auth.currentUser.updatePassword(password);


// *** Merge Auth and DB User API *** //

onAuthUserListener = (next, fallback) =>
this.auth.onAuthStateChanged(authUser => {
  if (authUser) {
    this.user(authUser.uid)
      .once('value')
      .then(snapshot => {
		const dbUser = snapshot.val();
		if (!(authUser.mongoId) || !(authUser.profile)) {
			if (!(authUser.mongoId) || (authUser.mongoId === String)){
				doMongoDBGetUserIdWithFireid(authUser.uid).
				then(res => {
					if (!(authUser.profile) || (authUser.profile === String)){
						doMongoDBGetProfileWithFireid(authUser.uid).
						then(result => {
							authUser = {
								profile: result,
								mongoId: res,
								uid: authUser.uid,
								username: authUser.username,
								email: authUser.email,
								emailVerified: authUser.emailVerified,
								providerData: authUser.providerData,
								...dbUser,
							};
							next(authUser);
						})
					} else {
						authUser = {
							mongoId: res,
							profile: authUser.profile,
							uid: authUser.uid,
							username: authUser.username,
							email: authUser.email,
							emailVerified: authUser.emailVerified,
							providerData: authUser.providerData,
							...dbUser,
						};
						next(authUser);
					}}
			)} else {
				doMongoDBGetProfileWithFireid(authUser.mongoId).
				then(profile => {
					authUser = {
						profile,
						mongoId: authUser.mongoId,
						uid: authUser.uid,
						username: authUser.username,
						email: authUser.email,
						emailVerified: authUser.emailVerified,
						providerData: authUser.providerData,
						...dbUser,
					};
					next(authUser);
				})
			};
		} else {
			authUser = {
				profile: authUser.profile,
				mongoId: authUser.mongoId,
				uid: authUser.uid,
				username: authUser.username,
				email: authUser.email,
				emailVerified: authUser.emailVerified,
				providerData: authUser.providerData,
				...dbUser,
			};
			next(authUser);
		}
		// if (typeof authUser.profile !== "Object"){
		// 	// console.log("yup");
		// 	// create user from firebase User if no user was found 
		// 	// Only happens when mongoDB is not migrated as its local and 
		// 	// firebase is "serverless" in the "cloud";
		// 	console.log(authUser.profile);
		// 	console.log(typeof authUser.profile);
		// 	doMongoDBCreateUser(authUser.username, authUser.email, authUser.uid).then(
		// 		res => {
		// 			const profObj = {
		// 				firstname: "TBD",
		// 				lastname: "TBD",
		// 				username: authUser.username,
		// 				fireid: authUser.uid,
		// 			};
		// 			doMongoDBCreateProfile(profObj).then(res => authUser.profile = res).
		// 			catch(err => {
		// 				// means the profile was already created and we went here anyways 
		// 				if (err){
		// 					return err;
		// 				}
		// 			})
		// 		}
		// 	).catch(err =>{
		// 		//means the user already existed and we created another anyways
		// 		if (err){
		// 			return err;
		// 		}
		// 	});
		// }
		next(authUser);

      });
  } else {
    fallback();
  }
});

user = uid => this.db.ref(`users/${uid}`);

users = () => this.db.ref('users');
}

export default Firebase