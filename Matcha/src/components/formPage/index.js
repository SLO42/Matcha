import React, { Component } from 'react';
import Race from './formbuttons/race';
import Body from './formbuttons/gaybody';
import Straight from './formbuttons/straightbody';
import Interests from './formbuttons/interests';
import MyHeightSlider from './sliders/myheight.js';
import MyAgeSlider from './sliders/myage.js';
import MatchHeightSlider from './sliders/matchheight.js';
import MatchAgeSlider from './sliders/matchage.js';
import GenderChoice from './formbuttons/yourgender';
import SexualPreference from './formbuttons/matchgender';
import TextFieldUsername from './textfield';

import axios from 'axios';
import { ButtonBase } from '@material-ui/core';

const apiUserAdd = `http://localhost:3001/users/add`;
const apiProfileCreate = `http://localhost:3001/profiles/add`;
const apiGet = `http://localhost:3001/users/`;

class FormPageBase extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: false,
			
			userObj: {
				username: "",
				
				race: "",
				bodytype: "",
				interest: [],
				
				myheight: 0,
				myage: 0,
				mysex: "",
				
				prefheight: {min: 18, max: 99},
				prefage: {min: 18, max: 99},
				prefsex: "",

			},
			stop: true,
		};
	}

	postUser = () => {
		axios.get(apiGet)
		.then(res => {
			const userObject = JSON.stringify(res);
			if (userObject
				.search(`"username":"${this.state.userObj.username}"`) !== -1){
					return window.alert("Username in use");
			} else {
				const { userObj } = this.state;

				axios.post(apiUserAdd, userObj)
				.then(response => console.log(response))
				.catch(err => console.log(err));

				axios.post(apiProfileCreate, userObj)
				.then(response => console.log(response))
				.catch(err => console.log(err));
			}
		})
		.catch(err => {
			if (err) { console.log(err)}});
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const {userObj} = this.state;
		return(
			<div>
				<TextFieldUsername userObj={userObj} />
				<Race userObj={userObj}/>
				<br/>
				<Body userObj={userObj}/>
				<br/>
				<Straight userObj={userObj}/>
				<br/>
				<Interests userObj={userObj}/>
				<br/>
				<MyHeightSlider userObj={userObj}/>
				<MyAgeSlider userObj={userObj}/>
				<MatchAgeSlider userObj={userObj}/>
				<MatchHeightSlider userObj={userObj}/>
				<GenderChoice userObj={userObj}/>
				<br/>
				<SexualPreference userObj={userObj}/>
				<br />
				<ButtonBase onClick={() => this.postUser()}>button</ButtonBase>
			</div>
		)
	}


}

export default FormPageBase;