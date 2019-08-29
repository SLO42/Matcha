import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './context';
import * as ROUTES from '../constants/routes';

const needsProfileCreation = authUser =>
	authUser && authUser.profile && authUser.profile.__v === 0;

const withProfileVerification = Component => {
	class WithProfileVerification extends React.Component {
		constructor(props) {
			super(props);
		}
		render() {
			return (
				<AuthUserContext.Consumer>
					{authUser => needsProfileCreation(authUser) ? this.props.history.push(ROUTES.PROFILE_CREATION)
					 : (
						<Component {...this.props} />
					)}
				</AuthUserContext.Consumer>
			);
		}
	}

	return withRouter(WithProfileVerification);
}

export default withProfileVerification;
