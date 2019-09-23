import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
import { Button, Input, Card } from '@material-ui/core';

function PasswordForgetPage (){
  return (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
  );
};

const styles = {
  button: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #37474f 30%, #ffeb3b 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .4)',
    color: 'white',
    rounded: "true",
  },
  card: {
    width: "60vw",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "10vh",
    margin: "auto",
  },
};

const INITIAL_STATE = {
  password: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { password } = this.state;

    this.props.firebase
      .doPasswordReset(password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, error } = this.state;

    const isInvalid = password === '';

    return (
    <Card style={styles.card} >
      <form onSubmit={this.onSubmit} style={{width: "500px"}}>
        <Input
          style={{ float: 'center', width: "50%"}}
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          type="text"
          placeholder="New Password"
        />
        <Button 
        style={styles.button} disabled={isInvalid} type={"submit"}>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </Card>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
