import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardMedia, CardContent,
		Typography, CardActions, IconButton, makeStyles,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {doMongoDBGetProfileWithAuth, doMongoDBGetUserWithAuthEmail} from '../axios';
import CoordsCard from './coords';

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

	if (profile){
		return(
			<Card className={classes.card}>
				<CardHeader
					title={profile.fame}
					subheader={ profile ? profile.mystats.bio : value }
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						Interests: {profile.mystats.interest.join(", ")}
					</Typography>
					<CoordsCard profile={profile} edit={0}/>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="Share">
						<ShareIcon	/>
					</IconButton>
				</CardActions>
			</Card>
		);
	} else {
		return (
		<div>
			<p>
				reload page? idk things broke
			</p>
		</div>)
	}

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
					<ProfileCardStuff profile={profile} /> 
				} 
			</div>
		)
	}
}

const VisitProfileCardStuff = ({profile}) => {
	const classes = useStyles();
	const clicked = () => window.alert(profile);
	let value = "";

	if (profile){
		return(
			<Card className={classes.card}>
				<CardHeader
					title={profile.fame}
					subheader={ profile ? profile.mystats.bio : value }
					/>
					<p>
						Wants: {profile.wants.prefsex}
					</p>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						Interests: {profile.mystats.interest.join(" ")}
					</Typography>
					<CoordsCard profile={profile} edit={0}/>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="Share">
						<ShareIcon	/>
					</IconButton>
				</CardActions>
			</Card>
		);
	} else {
		return (
		<div>
			<p>
				reload page? idk things broke
			</p>
		</div>)
	}

}

export class VisitProfileCard extends Component{
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			profile: null,
		};
	}


	async componentDidMount() {
		if (this.props.profile){
			this.setState({profile: this.props.profile, loading: false});
		}
	};
	
	render() {
		const {
			loading,
			profile,
		} = this.state;

		return (
			<div>
				{
					loading ? 
					<p>Loading...</p> : 
					<VisitProfileCardStuff profile={profile} /> 
				} 
			</div>
		)
	}
}


export default ProfileCard;