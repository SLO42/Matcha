import React, { Component } from 'react';
import { compose } from 'recompose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import { Button, Paper, InputBase, CircularProgress } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
	withAuthorization,
	withEmailVerification,
	AuthUserContext,
	withProfileVerification,
 } from '../session';
import { Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../firebase';
import { GridList, GridListTile } from '@material-ui/core';

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

const styles = {
	paper: {
		rounded: true,
		width: "30vw",
		align: "center",
	},
	input: {
		width: "18vw",
	},
	button: {
		width: "6vw",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(44, 56, 126, .3)',
      color: 'white',
      rounded: "true",
      variant: "contained",
      textColor: "primary",
	},
	messages: {
    width: "70%",
    position: "center",
    margin: "auto",
  },
  card2: {
    margin: "auto",
  width: "25vh",
  position: "center",
  },
  delete: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #FE6B8B 30%, #bb0a1e 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    rounded: "true",
  },
  edit: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(50deg, #2c387e 20%, #33eaff 80%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    rounded: "true",
    textColor: "primary",
  },
}

const useStyles = makeStyles(theme => ({
	card: {
	  minWidth: "25vw",
	  maxWidth: "25vw",
		height: 460,
		rounded: true,
	},
	media: {
	  height: 0,
	  paddingTop: '56.25%', // 16:9
	},
	expand: {
	  transform: 'rotate(0deg)',
	  marginLeft: 'auto',
	  transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
	  transform: 'rotate(180deg)',
	},
	avatar: {
	  backg4roundColor: red[500],
	},
	root: {
		paddingBottom: 5,
		outlineColor: 'black',
		justifyContent: 'center',
	},
	images: {
		maxWidth: 420,
		minWidth: 420,
		// position: "absolute",
		margin: "auto",
	},
	pageMain: {
		minWidth: '720vl',
	  	backgroundColor: 'white',
	},
	pageMedia: {
		height: 0,

		paddingTop: '56.25%',
	},

  }));

const HomePageRoutes = () => {

	return(
			<div align="center">
				<Switch>
					<Route exact path={ROUTES.HOME} component={HomePage} />
				</Switch>
			</div>
)};


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div align="center">
		  <p>HOME PAGE</p>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
	withProfileVerification,
	withEmailVerification,
	withAuthorization(condition),
)(HomePage);
