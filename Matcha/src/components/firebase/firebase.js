import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
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
    };
  
doCreateUserWithEmailAndPassword = (email, password) => 
this.auth.createUserWithEmailAndPassword(email, password);


doSignInWithEmailAndPassword = (email, password) =>
this.auth.signInWithEmailAndPassword(email, password);

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
  url: 'localhost:3000',
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
        // default empty roles
        if (!dbUser.roles) {
          dbUser.roles = [];
        }
        // merge auth and db user
        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          providerData: authUser.providerData,
          ...dbUser,
        };

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