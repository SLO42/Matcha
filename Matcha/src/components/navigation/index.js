import React from 'react';
import { Link } from 'react-router-dom';
/* import SignOutButton from '../signout';*/
import Divider from '@material-ui/core/Divider';
import * as ROUTES from '../constants/routes';
import { AuthUserContext, withAuthorization } from '../session';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SignOutButton from '../signout';
import { compose } from 'recompose';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c387e',
    },
},
});

const styles = theme => ({

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
      <li key={"block"}>
        <Link to={ROUTES. BLOCK_USER}>BLOCK USER</Link>
      </li>
      <li key={"report"}>
        <Link to={ROUTES.REPORT_USER}>REPORT USER</Link>
      </li>
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

const NavigationFinal = () => (
    <ul style={{listStyleType: 'none'}}>
    <li key={"landing"}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li key={"home"}>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li key={"account"}>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li key={"profile"}>
        <Link to={ROUTES.PROFILE}>Profile</Link>
      </li>
      <li key={"out"}>
        <SignOutButton/>
      </li>
    </ul>
);

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
	withStyles(styles),
)(Navigation);