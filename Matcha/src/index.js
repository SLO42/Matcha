import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/firebase';


const root = document.getElementById('root');

// const Context = () => (
// 	<ProfileContext.Provider value={new Profile()} >
// 		<App />
// 	</ProfileContext.Provider>
// );

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
    <App />
    </FirebaseContext.Provider>, root);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
