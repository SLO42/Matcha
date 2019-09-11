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

import {ProfileCard, ProfileCardEdit} from '../_cards';
import { withAuthentication, AuthUserContext, withProfileVerification, withAuthorization,} from '../session';
import { compose } from 'recompose';
import { doMongoDBGetGalleryWithAuth } from '../axios';
import { isThisSecond } from 'date-fns';

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
    maxHeight: `50vh`,
		maxWidth: `40vw`,
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
			gallery: [],
		}
	}

	async componentDidMount() {
		this.setState({loading: true});
		if (this.props.authUser && this.props.authUser.profile && this.props.authUser.profile.picture){
			const profile = this.props.authUser.profile;
			const picture = profile.picture;

			if (picture === "nah" || picture === "empty") this.setState({picture: TTY});
			else this.setState({picture});
		} else this.setState({picture: TTY});
		this.setState({loading: false});	
	}
	



	render(){
		const {classes} = this.props;

		return ( this.state.loading ? <p>loading...</p> : (
			<Grid container justify="left" alignItems="left" >
				<Avatar alt="Profile-Image" src={this.state.picture} className={classes.bigAvatar} />
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
	const changeStates = () => {
		setValue(!value)
		setTimeout(setValue(!value), 100);
	}

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
				{ value ? <ProfileCardEdit authUser={authUser} changeState={changeStates}/> : 
				<ProfileCard authUser={authUser}/>}
				<div style={styles.panel}>
					<RightPanel/>
				</div>
			</CardContent> 
		</Paper>
	);
}

class ProfilePage extends React.Component {

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