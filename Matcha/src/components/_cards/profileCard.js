import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader,  CardContent,
		Typography, CardActions, IconButton, makeStyles,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import { getSwiped} from '../axios';
import CoordsCard from './coords';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { withAuthentication} from '../session';

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
			profile: null,
		};
	}


	async componentDidMount() {
		this.setState({loading: true});
		if(this.props.authUser.profile){
			this.setState({profile: this.props.authUser.profile});
		}

		this.setState({loading: false});

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
					<ProfileCardStuff profile={profile} /> 
				} 
			</div>
		)
	}
}

const VisitProfileCardStuff = ({liked, setliked, authUser, profile, firebase}) => {
	const classes = useStyles();
	

	const doConfirm = async () => {
		if (window.confirm(`Are you sure you would like ${profile.username}?` )){
			const res = await firebase.doLikeUser(authUser.profile, profile);
			if (res === "No"){
				window.alert("something went wrong?");
			} else {
				setliked(res.data.swiped);
			}
		} else window.alert("Okay no to that");
	}
	let value = "";

	if (profile && authUser){
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
					Interests: {profile.mystats.interest.join(", ")}
					</Typography>
					<CoordsCard profile={profile} edit={0}/>
				</CardContent>
				<CardActions disableSpacing>
		
					<IconButton aria-label="Share" onClick={doConfirm}>
						<FavoriteIcon	/>
						{liked ? "You Like this user" : "Click here to like"}
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

class VisitProfileCardBase extends Component{
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			profile: null,
			swiped: null,
		};
	}

	setliked = (swiped) => {
		this.setState({loading: true});
		this.setState({swiped});
		this.setState({loading: false});
	}

	doIt = async () => await getSwiped(this.props.authUser.username).then(res => res.data).catch(err => {if (err) return err});

	async componentDidMount() {
		this.setState({loading: true});
		if (this.props.profile){
			this.setState({ profile: this.props.profile});
		}
		if(this.props.authUser){
			this.setState({swiped: await this.doIt()})
		}
		this.setState({loading: false})
	};

	
	render() {
		const {
			loading,
			profile,
		} = this.state;
		
		const isLiked = () => {
			if (this.state.swiped){
				return this.state.swiped.includes(profile.username)
			}
		} 
		return (
			<div>
				{
					loading ? 
					<p>Loading...</p> : 
					 (<VisitProfileCardStuff liked={isLiked()} setliked={this.setliked} authUser={this.props.authUser} profile={profile} firebase={this.props.firebase}/> )
				} 
			</div>
		)
	}
}

const VisitProfileCard = compose(
	withFirebase,
	withAuthentication,
)(VisitProfileCardBase);

export {VisitProfileCard}

export default ProfileCard;