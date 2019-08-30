import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../signup';
import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
import Card from '@material-ui/core/Card';
import { CardContent, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {doGetUserFromUsername} from '../axios';

/** signin fixed for mobile*/
const styles = {
  wrap: {
    maxWidth: 600,
    minWidth: 500,
  },
  signup: {
    margin: "auto",
    width: "50%",
    position: "center",
    paddingTop: 10,
  },
  signin: {
    margin: "auto",
    width: "50%",
    position: "center",
  },
  icon: {
    color: '#2c387e',
  },
  list: {
    listStyleType: "none",
  },
  button: {
    padding: 10,
    margin: "auto",
    //width: "20%", non mobile
    width: "21vh",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(44, 56, 126, .3)',
      color: 'white',
      rounded: "true",
      variant: "contained",
      textColor: "primary",
  },
  card: {
    paddingBottom: 10,
    
  },
  passwordreset: {
    center: 0,
    float: "left",
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {

  },
}

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <h2>Please make an account, or sign in to continue.</h2>
    <Card style={styles.signin}>
      <CardContent>
      <SignInForm />
      </CardContent>
    </Card>
    <br/>
    <Card style={styles.signup}>
      <CardContent>
      <SignUpLink />
      </CardContent>
    </Card>
    <br/>
    <div >
    {/* <SignInGoogle></SignInGoogle>
    <SignInFacebook></SignInFacebook>
    <SignInTwitter></SignInTwitter> */}
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
	const { email, password } = this.state;
	if (email.indexOf("@") === -1){
		const wait = async () => {
			await doGetUserFromUsername(email).then(res => {
				this.props.firebase
				.doSignInWithEmailAndPassword(res[0].email, password)
				.then(() => {
					this.setState({ ...INITIAL_STATE });
					this.props.history.push(ROUTES.HOME);
				})
				.catch(error => {
					this.setState({ error });
				});}
			).
			catch(err => {if (err) return err});
		}
		wait();
	} else {
		this.props.firebase
		  .doSignInWithEmailAndPassword(email, password)
		  .then(() => {
			this.setState({ ...INITIAL_STATE });
			this.props.history.push(ROUTES.HOME);
		  })
		  .catch(error => {
			this.setState({ error });
		  });
	}


    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} style={{ float: 'center'}}>
        <Input
        style={{ float: 'center', /*width: "30vw" nonmobile*/ width: "39vw"}}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <Input
         onSubmit={this.onSubmit}
        style={{ float: 'center', width: "39vw", }}
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Button style={styles.button} disabled={isInvalid} onClick={this.onSubmit}>
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;