import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent,
		 makeStyles, ButtonBase,Input, 
} from '@material-ui/core';
import TextBio from '../formPage/textfield';
import Chips from '../formPage/formbuttons/interests.js';
import MatchGender from '../formPage/formbuttons/matchgender';
import MyGender from '../formPage/formbuttons/yourgender';
import ImageCard from './imagecard';
import Axios from 'axios';
import CoordsCard from './coords';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		maxWidth: 800,
		backgroundColor: "transparent",
	},
	media: {
		height: 10,
		paddingTop: '56.25%',
	},
}))

const InputFields = ({profile}) => {
	
	const [first, setFirst] = React.useState( profile ? profile.firstname : "");
	const [last, setLast] = React.useState( profile ? profile.lastname : "");

	const changefirst = event => {
		setFirst(event.target.value);
		profile.firstname = event.target.value;
	}
	const changelast = event => {
		setLast(event.target.value);
		profile.lastname = event.target.value;
	}

	return (
		<div>

			<Input
				value={first}
				type="text"
				onChange={changefirst}
				placeholder={"firstname"}
				name={"firstname"}
				autoComplete={"Firstname"}
				/>
			<br />
			<Input
				value={last}
				type="text"
				onChange={changelast}
				placeholder={"Lastname"}
				name={"Lastname"}
				autoComplete={"Lastname"}
			/>
		<br />
		</div>
	)
}

const ProfileCardStuff = ({profile, authUser}) => {
	const classes = useStyles();
	let value = "";

	const checkStage = val => {
			
	}

	const Save = ({profile}) => {
		const updateProfile = process.env.REACT_APP_AXIOS_UPDATE_PROFILE;
		const confirm = () => {
			if (window.confirm("You are about to update your profile, please Confirm")){
				Axios.put(updateProfile, profile).then(res =>{
					//wow nice update...
				}).catch(err => {if (err) return err;});
			}
		}

		return (
			<ButtonBase onClick={confirm}>
					Save Your Profile
				</ButtonBase>
		)
	}
	if (profile){
		return(
			<Card className={classes.card}>
				<CardHeader
					title={profile.fame}
					subheader={ profile ? profile.mystats.bio : value }
				/>
				<CardContent >
					<CoordsCard key={1} profile={profile} edit={1}/>
					<Chips key={2} profile={profile} checkStage={checkStage}/>
					<TextBio key={3} profile={profile} checkStage={checkStage} />
					<MyGender key={4} profile={profile} checkStage={checkStage} />
					<InputFields key={4.5} profile={profile} />
					<MatchGender key={5} profile={profile} checkStage={checkStage} />
					<ImageCard key={6} profile={profile} authUser={authUser}/>
					<Save profile={profile} />
				</CardContent>
			</Card>
		);
	} else {
		return (
			<p>i think something needs a reload</p>
		)
	}

}

class ProfileCardEdit extends Component{
	constructor(props){
		super(props);

		this.state = {
			authUser: this.props.authUser,
			loading: true,
			profile: this.props.authUser.profile,
		};
	}

	// getUser = () => {
	// 	let userObj = {};
	// 	const wat = doMongoDBGetUserWithAuthEmail(this.props.authUser).
	// 	then(async (res) => {
	// 		userObj = res;
	// 		// console.log(userObj);
	// 		this.setState({userObj})
	// 		return res;	
	// 	})
	// }

	// getProfile = () => {
	// 	let profileObj = {};
	// 	// console.log(this.state.userObj.username)
	// 	const wat = doMongoDBGetProfileWithAuth(this.state.userObj.username).
	// 	then(async (res) => {
	// 		profileObj = res;
	// 		this.setState({profileObj});
	// 		return res;
	// 	})
	// }

	async componentDidMount() {
		this.setState({loading: false});

	};
	
	render() {
		const {
			authUser,
			loading,
			profile,
		} = this.state;

		return (
			<div>
				{
					loading ? 
					<p>Loading...</p> : 
					<ProfileCardStuff profile={profile} authUser={authUser}/> 
				} 
			</div>
		)
	}
}

export default ProfileCardEdit;