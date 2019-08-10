import React from 'react';
import { Link } from 'react-router-dom';
/* import SignOutButton from '../signout';
 */import * as ROUTES from '../constants/routes';
import { AuthUserContext } from '../session';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SignOutButton from '../signout';
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
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
    <ul >
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.PROFILE}>PROFILE</Link>
      </li>
      <li>
        <Link to={ROUTES.PROFILE_CREATION}>CREATE YOUR PROFILE</Link>
      </li>
      <li>
        <SignOutButton/>
      </li>
    </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

export default withStyles(styles)(Navigation);