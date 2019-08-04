import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextFeildUsername = ({userObj}) => {
	const [value, setValue] = React.useState(userObj.username);

	const handleChange = (event) => {
		setValue(event.target.value);
		userObj.username = event.target.value;
	}

	return (
		<div className="TextFeildUsername">
			<TextField
              variant="outlined"
			  margin="normal"
			  onChange={handleChange}
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
			  />
		</div>
	)
}

export default TextFeildUsername;