import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
//import * as ROLES from '../constants/roles';
import { Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm/>
  </div>
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c387e',
    },
    secondary: {
        main: '#33eaff',
    }
},
});

const styles = theme => ({

  mobileCard: {
    width: "60%",
    margin: "auto",
  },
  mobileButton: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    float: "center",
    rounded: "true",
  },
  card: {
    width: "60%",
    margin: "auto",
    
  },
  button: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    float: "center",
    rounded: "true",
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
}});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    /* const roles = {};
    
    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    } */

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return console.log(this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          //roles,
        }));
      })
      .then(() => {
        return console.log(this.props.firebase.doSendEmailVerification());
      })
      .then(() => {
        console.log(this.setState({ ...INITIAL_STATE }));
        console.log(this.props.history.push(ROUTES.LANDING));
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      const renderMobile = (
        <MuiThemeProvider theme={theme}>
        <div style={styles.container}>
            <Card
              display="flex"
              rounded="true"
              style={styles.card}
              >
              <CardContent>
            <form onSubmit={this.onSubmit}>
              <Input
              style={{ float: "center", width: "50%"}}
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Enter a Username"
              /><br/>
              <Input
              style={{ float: "center", width: "50%"}}
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              /><br/>
              <Input
              style={{ float: "center", width: "50%"}}
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              /><br/>
              <Input
              style={{ float: "center", width: "50%"}}
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              /><br/>
              <br></br>
              <Button 
              style={styles.button}
              disabled={isInvalid} type="submit">
                Sign Up
              </Button>
      
              {error && <p>{error.message}</p>}
            </form>
            </CardContent>
            </Card>
            </div>
            </MuiThemeProvider>
      );

    return (
      <MuiThemeProvider theme={theme}>
            {renderMobile}
      </MuiThemeProvider>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };