import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import Button from '@material-ui/core/Button';

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

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p style={{color: "#ffff00"}}>
                    E-Mail confirmation sent: Check your E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </p>
                ) : (
                  <p style={{color: "#ffff00"}}>
                    Verify your E-Mail: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                  </p>
                )}

                <Button
                  type="button"
                  style={styles.button}
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </Button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
