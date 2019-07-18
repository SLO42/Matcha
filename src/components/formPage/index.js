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

class FormPageBase extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: false,
			
			userObj: {
				race: "",
				bodytype: "",
				interest: [],
				
				myheight: 0,
				myage: "",
				mysex: "",
				
				prefheight: {min: 18, max: 99},
				prefage: {min: 18, max: 99},
				prefsex: "",

			},
			// setFormState: userObj => {
			// 	console.log(userObj)
			// 	// await this.setState(this.state);
			// 	// return null;
			// },
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const {userObj} = this.state;
		return(
			<div>
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
			</div>
		)
	}


}

export default FormPageBase;