import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBox from '@material-ui/icons/AccountBox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navigation from '../navigation';
import * as ROUTES from '../constants/routes';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TTY from './tty.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, CardContent, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import SettingsIcon from '@material-ui/icons/Settings';
import ReportIcon from '@material-ui/icons/Report';
import { Switch, Route, Link } from 'react-router-dom';
import {ProfileCard, ProfileCardEdit, VisitProfileCard} from '../_cards';
import { withAuthentication, AuthUserContext, withProfileVerification, withAuthorization,} from '../session';
import { compose } from 'recompose';
import { doMongoDBGetGalleryWithAuth } from '../axios';
import MyCamera from '../camera';
import Axios from 'axios';
import {CustomizedMenus} from '../report/report.js';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2c387e',
      },
      secondary: {
          main: '#33eaff',
      },
  },
  });
  
  const styles = {
      tty: {
          width: "650px",
      },
      panel: {
          justify: "right",
          alignItems: "right",
          width: "30vw",
	  },
  }

  const useStyles = makeStyles({
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      minWidth: 145,
      minHeight: 145,
    },
    root: {
        width: '100%',
		paddingBottom: "40px",
		backgroundColor: "forestgreen",
      },
      notif: {
          height: 100,
		  width: 600,
      },
      rightPanel: {
          position: 'right',
          justify: "right",
          maxHeight: `50vh`,
          maxWidth: `40vw`,
	  },
	  benis: {
    elevation: 24,
    // maxHeight: `50vh`,
		// maxWidth: `40vw`,
		boxShadow: '100 3px 5px 2px rgba(44, 56, 126, .3)',
	}
  });


export function SimpleRating() {
    const [value, setValue] = React.useState(2);
  
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
    );
  }

// export class Gallery extends React.Component{
// 	constructor(props){
// 		super(props);

// 		this.state = {
// 			gallery: null,
// 			edit: null,
// 		}
// 	}

// 	componentDidMount() {
// 		this.setState({gallery: this.props.gallery, edit: this.props.edit});

// 	}
// 	// if (gallery.length === 1) return null;

// 	render() {
// 		const {gallery, edit} = this.state;
// 		let len = 0;
// 		if (gallery){
// 			len = gallery.length;
// 		}
// 		let i = 1;
// 		let images = [];
// 		let edits = [gallery && gallery[0] ? gallery[0] : "empty" ,
// 		gallery && gallery[1] ? gallery[1] : "empty",
// 		gallery && gallery[2] ? gallery[2] : "empty",
// 		gallery && gallery[3] ? gallery[3] : "empty",
// 		gallery && gallery[4] ? gallery[4] : "empty"];

// 		while (i < len)
// 		{
// 			images.push(gallery[i])

// 			i++;
// 		}
// 		return (
// 			edit ? <p>test</p> : <p>no</p>
// 		)
// 	}

// 	// return ( images.map((obj) => {
// 	// 	return (
// 	// 		edit ? <p>test</p> :
// 	// 		<Card minWidth={'15vw'} minHeight={'15vh'} >
// 	// 			<CardMedia src={obj} alt={obj} />
// 	// 		</Card> 
// 	// 	)
// 	// }))
// }

export class ImageAvatars extends React.Component {
	constructor(props){
		super(props);

		this.state = { 
			loading: true, 
			picture: null, 
			gallery: {},
			change: false,
		}
	}

	async componentDidMount() {
		this.setState({loading: true});
		if (this.props.authUser && this.props.authUser.profile && this.props.authUser.profile.picture){
			this.setState({picture: this.props.authUser.profile.picture});
			doMongoDBGetGalleryWithAuth(this.props.authUser).then(
				res => {
					this.setState({gallery: res.gallery});
					this.setState({loading: false});
				}).catch(err => {
					// should only happen if gallery doesnt exist for user...
					if (err){
						return (err);
					}
				})
			} else {
				this.setState({picture: TTY});
				this.setState({loading: false});
			}
	}

	newProfilePic = () => {
		if (window.confirm("Would you like to Change your profile Picture?")){
			this.setState({change: true, loading: true});
		}
	}

	updatePhoto = (picture) => {
		if (picture) {
			this.setState({picture});
			const updateProfile = process.env.REACT_APP_AXIOS_UPDATE_PROFILE;
			const profile = {picture, fireid: this.props.authUser.uid};
			if (window.confirm("Would you like to save this photo?")){
				Axios.put(updateProfile, profile).then(res => {
					this.props.authUser.profile.picture = picture;
					this.setState({loading: false, change: false});
				}).catch(err => {if (err) return err});
			}
		}

	}

	mappedGallery = () => {
		const {gallery} = this.state;
		let i = 0;
		let mapped = [];

		while (i < 4){
			if (gallery[i] === "nah" || gallery[i] ==="empty" || gallery[i] === undefined){
				break;
			}else{
				mapped[i] = gallery[i];
			}
			i++;
			if (i > 5) break;
		}
		return (mapped);
	}

	render(){
		const {classes, visit} = this.props;
		let mapp = this.mappedGallery();
		return ( this.state.loading ? this.state.change ? (
			<MyCamera updatePhoto={this.updatePhoto}/>
		) : <p>loading...</p> : (
			<Grid container justify="left" alignItems="left" >
					<Avatar alt="Profile-Image" src={this.state.picture} className={classes.bigAvatar}  onClick={this.newProfilePic}/>
					{mapp.map(img => {
						return <Avatar alt="Gallery-Image" className={classes.bigAvatar} src={img} />
					})}
			</Grid> )
    	)}
}

export function Notifications() {
    const classes = useStyles();
  
    return (
      <Grid container justify="center" alignItems="center">
        <Paper className={classes.notif}>
                <p>
                    NEW NOTIFICATIONS
                </p>
            </Paper>
      </Grid>
    );
  }

  export function RightPanel() {
    const classes = useStyles();
  
    return (
      <Grid container justify="right" alignItems="right">
        <Paper className={classes.rightPanel}>
            <Notifications/>
            <SimpleRating/>
            </Paper>
      </Grid>
    );
  }

export const ChigBungusExpress = ({authUser}) => {
	const classes = useStyles();

	const [value, setValue] = React.useState(false);

	const changeState = () => setValue(!value)

	return (
		<Paper className={classes.benis}>
			<CardHeader title={authUser.username}
			 action={
				 <IconButton aria-label="settings" onClick={changeState}>
					<SettingsIcon />
				 </IconButton>
			 }
			 />
			 <CardContent>
				<div  style={styles.tty}>
					<ImageAvatars authUser={authUser} classes={classes}/>
				</div>
				{ value ? <ProfileCardEdit authUser={authUser}/> : 
				<ProfileCard authUser={authUser}/>}
				<div style={styles.panel}>
					<RightPanel/>
				</div>
			</CardContent> 
		</Paper>
	);
}


export class VistImageAvatars extends React.Component {
	constructor(props){
		super(props);

		this.state = { 
			loading: true, 
			picture: null, 
			gallery: {},
		}
	}

	async componentDidMount() {
		this.setState({loading: true});
		if (this.props.profile.picture && this.props.profile.picture !== "nah" && this.props.profile.picture !== "empty"){
			this.setState({picture: this.props.profile.picture, gallery: this.props.gallery});
			this.setState({loading: false})
		} else {
				this.setState({picture: TTY});
				this.setState({loading: false});
			}
	}

	mappedGallery = () => {
		const {gallery} = this.state;
		let i = 0;
		let mapped = [];

		while (i < 4){
			if (gallery[i] === "nah" || gallery[i] ==="empty" || gallery[i] === undefined){
				break;
			}else{
				mapped[i] = gallery[i];
			}
			i++;
			if (i > 5) break;
		}
		return (mapped);
	}

	render(){
		const {classes} = this.props;
		let mapp = this.mappedGallery();
		return ( this.state.loading ? <p>loading...</p> : (
			<Grid container justify="left" alignItems="left" >
					<Avatar alt="Profile-Image" src={this.state.picture} className={classes.bigAvatar}/>
					{mapp.map(img => {
						return <Avatar alt="Gallery-Image" className={classes.bigAvatar} src={img} />
					})}
			</Grid> )
    	)}
}

const ProfilePage = () => {
	return(
		<div>
			<Switch>
				<Route exact path={ROUTES.PROFILE} component={ProfileProfile} />
				<Route exact path={ROUTES.MATCHPROFILE} component={ProfileVisit} />
			</Switch>
		</div>
	)
}

class ProfileVisit extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			profile: null,
			gallery: null,
		};
	}


	VisitExpress = ({profile, gallery}) => {
		const classes = useStyles();
		
		return (
			<Paper className={classes.benis}>
				<CardHeader title={profile.username}
					subheader={`*${profile.mystats.mysex}* - ${profile.firstname} ${profile.lastname}`}
					action={
						<CustomizedMenus user={profile.username} />
					}
				 />
				 <CardContent>
					<div  style={styles.tty}>
						<VistImageAvatars profile={profile} classes={classes} gallery={gallery}/>
					</div>
					<VisitProfileCard profile={profile}/>
					<div style={styles.panel}>
						<RightPanel/>
					</div>
				</CardContent> 
			</Paper>
		);
	}




	componentDidMount() {
		this.setState({
			loading:true, profile:this.props.location.state.profile
		});
		if (this.props.location.state.profile){
			if (this.props.location.state.visit) {
				//do tell backend that you have visited the user. marking the profile. 
				this.props.location.state.visit = false;
			} 
			doMongoDBGetGalleryWithAuth({uid: this.props.location.state.profile.fireid}).then(
				res => {
					this.setState({gallery: res.gallery, loading: false});
				}
			).catch(err => {
				//will err if the props are passed via location.
				if (err) return err;
			})
		}

	};

	render() {
		const {loading, profile, gallery} = this.state;
		return(
				loading ? <h2>...Loading</h2> : <this.VisitExpress gallery={gallery} profile={profile}/>
		)
	}
}

class ProfileProfile extends React.Component {
    render() {
        return(
		<MuiThemeProvider theme={theme}>
			<AuthUserContext.Consumer>
				{authUser => ( authUser ?
					<ChigBungusExpress authUser={authUser} /> : 
					<h1>Looks like you arent connected</h1>
				)}
			</AuthUserContext.Consumer>
      </MuiThemeProvider>
        );
    };
}

const condition = authUser => !!authUser;

export default compose(
	withProfileVerification,
	withAuthentication,
	withAuthorization(condition)
)(ProfilePage);


// export default (withAuthentication(ProfilePage));