import React from 'react';
import { compose } from 'recompose';
import Interests from './formbuttons/interests';
import Card from '@material-ui/core/Card';
import MyAge from './myage';
import MatchAgeSlider from './matchage';
import GenderChoice from './formbuttons/yourgender';
import SexualPreference from './formbuttons/matchgender';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import TextBio from './textfield';
import axios from 'axios';
import { ButtonBase } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import MyCamera from '../camera';
import {doMongoCreateGallery} from '../axios';

// change to use the current object and update it to whaterever you want, 
//then check for changes and update only the changes.
const INITAL_STATE = {
	stage: 0,
	loading: true,
	profile: {
		fireid: "",
		mystats:{
			myage: 0,
			mysex: "",
			interest: [],
			bio: "",
		},
		wants: {
			prefage: {
				min: 18,
				max: 99,
			},
			prefsex: "",
		},
		location: {lon: 0.0, lat: 0.0},
	},		
	profilePhoto: null,
}

// migrate current profile to state after mount. make sure 
// pushed all the info
class FormPageBase extends React.Component {
	constructor(props){
		super(props);
		
		this.state = { ...INITAL_STATE };
		
	}

	updatePhoto = profilePhoto => {
		this.setState({profilePhoto});
	}

	postUser = async () => {
		const updateProfile = process.env.REACT_APP_AXIOS_UPDATE_PROFILE;
		let {profile, profilePhoto} = this.state;
		profile.fireid = this.props.authUser.uid;
		await axios.put(updateProfile, profile).
		then(async res => {
			console.log(res);
			this.props.authUser.profile = await res.data;

			if(profilePhoto){
				const gallery = {0: profilePhoto};
				await doMongoCreateGallery(this.props.authUser.uid, gallery);
			}else {
				const gallery = {0: "nah"};
				await doMongoCreateGallery(this.props.authUser.uid, gallery);
			}
		}).
		then(() => this.props.history.push(ROUTES.LANDING))
	}
	
	checkStage = value => {
		if (this.state.stage < value) this.setState({stage: value});
	}
	// postUser = () => {
	// 	axios.get(apiGet)
	// 	.then(res => {
	// 		const userObject = JSON.stringify(res);
	// 		if (userObject
	// 			.search(`"username":"${this.state.userObj.username}"`) !== -1){
	// 				return window.alert("Username in use");
	// 		} else {
	// 			const { userObj } = this.state;

	// 			axios.post(apiUserAdd, userObj)
	// 			.then(response => console.log(response))
	// 			.catch(err => console.log(err));

	// 			axios.post(apiProfileCreate, userObj)
	// 			.then(response => console.log(response))
	// 			.catch(err => console.log(err));
	// 		}
	// 	})
	// 	.catch(err => {
	// 		if (err) { console.log(err)}});
	// }

	

	componentDidMount() {
		this.setState({ loading: true});
		if (this.props.authUser.profile){
			let authProf = this.props.authUser.profile;
			if (authProf.__v > 0) this.props.history.push(ROUTES.PROFILE);
		}

		this.setState({ loading: false });
	}

	componentWillUnmount() {

	}
	//lets step through these as individual questions 
	// also route out of here so you never ocme back.
	// add protection so that only profiles with a __v === 0 
	// can visit the page.
	
	render() {
		const {profile, stage} = this.state;
		return(
			<Card>
				<p> Welcome {this.props.authUser.username}</p>
				<br/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<MyAge profile={profile} checkStage={this.checkStage}/>
				</MuiPickersUtilsProvider>
				<div className={{display: "flex"}}>
					<Zoom in={stage > 0}>
						<div>
							<TextBio profile={profile} checkStage={this.checkStage}/>
							<Zoom in={stage > 1}> 
								<div>
									<MatchAgeSlider profile={profile} checkStage={this.checkStage}/>
									<Zoom in={stage > 2}> 
										<div>
											<GenderChoice profile={profile} checkStage={this.checkStage}/>
											<Zoom in={stage > 3}> 
												<div>
													<br/>
													<SexualPreference profile={profile} checkStage={this.checkStage}/>
													<Zoom in={stage > 4}> 
														<div>
															<br />
															<Interests profile={profile} checkStage={this.checkStage}/>
															<br/>
															<Zoom in={stage > 5}> 
																<div style={{margin: 'auto'}}>
																	<Card >
																		<MyCamera updatePhoto={this.updatePhoto}/>
																		<ButtonBase onClick={() => this.postUser()}>Create your Profile</ButtonBase>
																		<br />
																	</Card>
																</div>
															</Zoom>
														</div>
													</Zoom>
												</div>
											</Zoom>
										</div>
									</Zoom>
								</div>
							</Zoom>
						</div>
					</Zoom>
				</div>
			</Card>
		)
	}


}


export default compose(
	withRouter,
)(FormPageBase);

// export default FormPageBase;