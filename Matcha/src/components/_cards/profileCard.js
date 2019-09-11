import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardMedia, CardContent,
		Typography, CardActions, IconButton, makeStyles,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {doMongoDBGetProfileWithAuth, doMongoDBGetUserWithAuthEmail} from '../axios';

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
		backgroundColor: "transparent",
	},
	media: {
		height: 10,
		paddingTop: '56.25%',
	},
}))

const ProfileCardStuff = ({profile}) => {
	const classes = useStyles();
	const clicked = () => window.alert(profile);
	let value = "";

	return(
		profile.mystats ? 
		<Card className={classes.card}>
			<CardHeader
				title={profile.fame}
				subheader={ profile ? profile.mystats.bio : value }
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					interests: {profile.mystats.interest.map(val => <h2>{val}</h2>)}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="Share">
					<ShareIcon	/>
				</IconButton>
			</CardActions>
		</Card> : <h1>loading</h1>
	);

}

class ProfileCard extends Component{
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
		// const {profile} = this.state;
		// if (!profile.mystats){
			
		// }

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
					<ProfileCardStuff profile={profile} /> 
				} 
			</div>
		)
	}
}

export default ProfileCard;