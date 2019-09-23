import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { AuthUserContext } from '../session';
import {  makeStyles } from '@material-ui/core/styles';
import SignOutButton from '../signout';
import { compose } from 'recompose';
import RoomIcon from '@material-ui/icons/Room';
import { ListItemText, ListItemIcon } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import List from '@material-ui/core/List';

const useStyles = makeStyles({
	list: {
	  width: 250,
	},
	fullList: {
	  width: 'auto',
	},
  });

const Navigation = ({ authUser }) => (
  <div>
  <AuthUserContext.Consumer>
      {authUser =>
        authUser ? 
		(authUser.profile && authUser.profile.__v) ? 
		<NavigationFinal /> : <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
    <ul style={{listStyleType: 'none'}} key={"start"}>
    <li key={"landing"}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li key={"home"}>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li key={"account"}>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {/* <li key={"block"}>
        <Link to={ROUTES. BLOCK_USER}>BLOCK USER</Link>
      </li>
      <li key={"report"}>
        <Link to={ROUTES.REPORT_USER}>REPORT USER</Link>
      </li> */}
      <li key={"profile"}>
        <Link to={ROUTES.PROFILE}>PROFILE</Link>
      </li>
      <li key={"profile creation"}>
        <Link to={ROUTES.PROFILE_CREATION}>CREATE YOUR PROFILE</Link>
      </li>
      <li key={"out"}>
        <SignOutButton/>
      </li>
    </ul>
);

const NavigationFinal = () => {
const classes = useStyles();

	return (
		<List>
			<ListItem className={classes.list} button key={"landing"} component={Link} to={ROUTES.LANDING} >
				<ListItemIcon >
					<RoomIcon/>
				</ListItemIcon>
				<ListItemText primary="Landing" />
			</ListItem>
			<ListItem className={classes.list} button key={"home"} component={Link} to={ROUTES.HOME} >
				<ListItemIcon >
					<HomeIcon/>
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItem>
			<ListItem className={classes.list} button key={"account"} component={Link} to={ROUTES.ACCOUNT} >
				<ListItemIcon >
					<AccountCircleIcon/>
				</ListItemIcon>
				<ListItemText primary="Account" />
			</ListItem>
			<ListItem className={classes.list} button key={"profile"} component={Link} to={ROUTES.PROFILE} >
				<ListItemIcon >
					<FaceIcon/>
				</ListItemIcon>
				<ListItemText primary="Profile" />
			</ListItem>
			<SignOutButton />
		</List>
	)
}

    // <ul style={{listStyleType: 'none'}}>
    // <li key={"landing"}>
    //   <Link to={ROUTES.LANDING}>Landing</Link>
    // </li>
    // <li key={"home"}>
    //     <Link to={ROUTES.HOME}>Home</Link>
    //   </li>
    //   <li key={"account"}>
    //     <Link to={ROUTES.ACCOUNT}>Account</Link>
    //   </li>
    //   <li key={"profile"}>
    //     <Link to={ROUTES.PROFILE}>Profile</Link>
    //   </li>
    //   <li key={"out"}>
    //     <SignOutButton/>
    //   </li>
    // </ul>
// );

const NavigationNonAuth = () => (
  <ul>
    <li key={"landing"}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li key={"signin"}>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li key={"signup"}>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);


export default compose(
	// withStyles(styles),
)(Navigation);