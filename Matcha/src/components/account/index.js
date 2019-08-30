import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../session';
import { Button } from '@material-ui/core';
import EmailChangeForm from '../emailchange';
import { withFirebase } from '../firebase';
import { PasswordForgetForm } from '../passwordforgot';
import PasswordChangeForm from '../passwordchange';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

 const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
        main: '#ffeb3b',
    }
},
});

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  },
];

const styles = {
  list: {
    listStyleType: "none",
    marginBottom: 0,
  },
  button: {
    padding: 10,
    margin: "auto",
    width: "20vw",
    background: 'linear-gradient(45deg, #37474f 30%, #ffeb3b 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 5px rgba(255, 215, 0, .2)',
      color: 'white',
      rounded: "true",
      variant: "contained",
      textColor: "primary",
  },
  card: {
    width: "60vw",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
  },
  topCard: {
    width: "60vw",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
  },
  passwordchange: {
    width: "60vw",
    paddingTop: 10,
    paddingBottom: 10,
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    paddingBottom: 10,
  },
}



function AccountPage() {
  return (
    <MuiThemeProvider theme={theme}>
    <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1 style={{color: "#ffff00"}}>Account: {authUser.email}</h1>
        <h2 style={{color: "#ffff00"}}>Here you can manage your password and link other accounts.</h2>
        
        <div style={styles.passwordchange} >
        {/* <UsernameChangeForm style={styles.topCard}/> */}
        </div>
        
        <Card
        style={styles.card}
        >
        <CardContent
        >
        <EmailChangeForm/>
        </CardContent>
        </Card>
        <div style={styles.passwordchange} >
        <PasswordForgetForm style={styles.topCard}/>
        </div>
        <Card
        style={styles.card}
        >
        <CardContent
        >
        <PasswordChangeForm/>
        </CardContent>
        </Card>
        <Grid item md={12} direction="row"> 
        <LoginManagement style={styles.buttons} authUser={authUser} />
          </Grid>

     </div>
    )}
  </AuthUserContext.Consumer>
  </MuiThemeProvider>
  );
};

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null }),
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password,
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  /* onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  }; */

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div width="40%" height="40vh">
        <ul style={styles.list}>
          {SIGN_IN_METHODS.map(signInMethod => {
            //const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            );

            return (
              <li style={styles.list} key={signInMethod.id}>
                {signInMethod.id === 'password' ? (
                  <DefaultLoginToggle
                    //onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    //onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {error && error.message}
      </div>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <div style={styles.buttons}>
      <Button
      style={styles.button}
    variant="contained"
    color="primary"
      textColor="primary"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Un-link {signInMethod.id}
    </Button>
    </div>
  ) : (
    <div style={styles.buttons}>
      <Button
      style={styles.button}
      variant="contained"
      color="primary"
      type="Button"
      onClick={() => onLink(signInMethod.provider)}
    >
      Link {signInMethod.id}
    </Button>
    </div>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: '', passwordTwo: '' };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: '', passwordTwo: '' });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      //onlyOneLeft,
      isEnabled,
      signInMethod,
      //onUnlink,
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return isEnabled ? (
      <div style={styles.card}>
      {/* <Button
      style={styles.button}
      variant="contained"
        color="primary"
        type="Button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </Button> */}
      </div>
    ) : (
      <form onSubmit={this.onSubmit}>
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />

        <Button
        style={styles.button}
        variant="contained"
        color="primary"
         disabled={isInvalid} type="submit">
          Link {signInMethod.id}
        </Button>
      </form>
    );
  }
}


const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);