import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
import { Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import {doMongoDBGetUsers, doMongoDBCreateProfile} from '../axios';


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
    variant: "outlined",
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
  firstname: '',
  lastname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  users: '',
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;
const ERROR_CODE_COMPLEX_PASS = 'matcha: Need a more difficult password';


class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

	this.state = { ...INITIAL_STATE };
	// this.state = { ...INITIAL_STATE };
  }



  onSubmit = event => {
	const {username, email, firstname, lastname, 
		passwordOne, users } = this.state;

	let profObj = {firstname, lastname, username, userid: "", fireid: ""};

		const finder = (username) => {
			let rtv = 0;
			users.map(obj => {
				if (obj.username === username){
					rtv = 1;
				}
				return obj
			})
			return rtv;
		}
		const checker = (password) => {
			let rtv = 0;
			const checkCap = /(!?([A-Z]+))/gm;
			const checkNotSpec = /((?=[.$#[\]/]).)/gm;
			const checkSpec = /((?=[!-/]|[:-@]|[\^-`]|[{-~]).)/gm;
			if (!checkCap.test(password)){
				let error = {code: ERROR_CODE_COMPLEX_PASS,
					message: ERROR_CODE_COMPLEX_PASS + " | Need Capital letter"};
				this.setState({error});
				rtv = 1;
			}else if (checkNotSpec.test(password)){
				let error = {code: ERROR_CODE_COMPLEX_PASS,
					message: ERROR_CODE_COMPLEX_PASS + " | Remove illegal Char"};
				this.setState({error});
				rtv = 1;
			} else if (!checkSpec.test(password)){
				let error = {code: ERROR_CODE_COMPLEX_PASS,
					message: ERROR_CODE_COMPLEX_PASS + " | Add Special Char"};
				this.setState({error});
				rtv = 1;
			} else if (password.length < 6){
				let error = {code: ERROR_CODE_COMPLEX_PASS,
					message: ERROR_CODE_COMPLEX_PASS + " | Longer Password is required"};
				this.setState({error});
				rtv = 1;
			} 
			return rtv;
		}

	if (finder(username) === 1){
		let error = {code: "Username_in_use",
		 message: "Try again with a different Username " + username + 
			" is already taken"};
		 this.setState({error});
		 return error;
	} else if(checker(passwordOne)) {
		return 'error';

	} else this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
		this.props.firebase.doDatabaseCreateUser(username, email, authUser.user.uid);
		profObj.fireid = authUser.user.uid;
		doMongoDBCreateProfile(profObj).then(res => authUser.profile = res)
		.catch(err => {if(err) console.log(err)});
		return this.props.firebase.user(authUser.user.uid).set({
			  username,
			  email,
		});
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(async () => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROFILE_CREATION);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });
    event.preventDefault();
  };

  async componentDidMount() {
	  doMongoDBGetUsers().then(res => {
		
		this.setState({users: Array.from(res)});
		return res;
	});
  }

  onChange = event => {
	this.setState({ [event.target.name]: event.target.value });
	// if (event.target.name === 'username'){
	// 	const {users, username} = this.state;
	// }
  };
  _handleKeyDown = (e) => {
	if (e.key === 'Enter') {
	this.onSubmit(e);
	}
  }
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
	  username,
      email,
      passwordOne,
      passwordTwo,
	  error,
	  firstname,
	  lastname,
    } = this.state;

	
	// -----------> THIS IS A NOTE <-----------
	// This is proof that i tried to use an object array to refrence
	// This.state.a... i did not try value={this.state.`${obj.a}`}
	// But i mean it looks crazy so i'll try it later. 

	// const inputOptions = [
	// 	{a: username, b: "text", c: "Username"},
	// 	{a: firstname, b: "text", c: "Firstname"},
	// 	{a: lastname, b: "text", c: "Lastname"},
	// 	{a: email, b: "text", c: "Email"},
	// 	{a: passwordOne, b: "password", c: "Password"},
	// 	{a: passwordTwo, b: "password", c: "Confirm Passwird"},
	// ]
	//
	// DONT DO THIS with the per-usual .map(obj => ...)
	// something to do with M.UI <Input /> value being written 
	// making the component re-render, losing event focus.


    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
	  email === '' || 
	  username.length < 5 ||
	  username.length > 15;

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
					required
					value={username}
					type="text"
					onChange={this.onChange}
					placeholder={"Username"}
					name={"username"}
					autoComplete={"Username"}
				/>
				<br />
				<Input
					required
					value={firstname}
					type="text"
					onChange={this.onChange}
					placeholder={"Firstname"}
					name={"firstname"}
					autoComplete={"Firstname"}
				/>
				<br />
				<Input
					required
					value={lastname}
					type="text"
					onChange={this.onChange}
					placeholder={"Lastname"}
					name={"lastname"}
					autoComplete={"Lastname"}
				/>
				<br />
				<Input
					required
					value={email}
					type="text"
					onChange={this.onChange}
					placeholder={"Email"}
					name={"email"}
					autoComplete={"Email"}
				/>
				<br />
				<Input
					required
					value={passwordOne}
					type="password"
					onChange={this.onChange}
					placeholder={"Password"}
					name={"passwordOne"}
					autoComplete={"password"}
				/>
				<br />
				<Input
					required
					value={passwordTwo}
					type="password"
					onChange={this.onChange}
					placeholder={"Confirm password"}
					name={"passwordTwo"}
					autoComplete={"password"}
					onKeyDown={this._handleKeyDown}
				/>
				<br />
              <br></br>
              <Button 
			  style={styles.button}
			  onClick={this.onSubmit}
              disabled={isInvalid}>
                Sign Up
              </Button>
      
            </form>

			<p style={{margin: 'auto'}}> Make a new Password with the following stats: </p> <br />
			<p style={{margin: 'auto'}}>    1 | Capital letter ex:('A', 'B', 'C', ... 'Z') </p> <br />
			<p style={{margin: 'auto'}}>	1 | Special Character that is not ('.', '$', '#', '[', ']', '/') </p> <br />
			<p style={{margin: 'auto'}}>	6 | Character Minimum  </p> <br />
              {error && <p>{error.message}</p>}
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