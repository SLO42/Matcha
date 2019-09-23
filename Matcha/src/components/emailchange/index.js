import React, { Component } from 'react';
import firebase from 'firebase/app';
import { withFirebase } from '../firebase';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const INITIAL_STATE = {
  emailOne: '',
  error: null,
};

const styles = {
  card: {
    margin: "auto",
  width: "0%",
  position: "center",
  },
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
};


class EmailChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { emailOne } = this.state;

    var user = firebase.auth().currentUser;
    user.updateEmail(emailOne)
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
    const { emailOne, error } = this.state;

    const isInvalid = emailOne === '';

    return (
      <form onSubmit={this.onSubmit} style={{width: "500px"}}>
        <div style={styles.wrap}>
          
        <Input
          name="emailOne"
          value={emailOne}
          onChange={this.onChange}
          type="email"
          placeholder="Change Your Email"
        />
        <Button
        style={styles.button}
		disabled={isInvalid}
		type={"submit"}
        >
          Change My Email
        </Button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(EmailChangeForm);
