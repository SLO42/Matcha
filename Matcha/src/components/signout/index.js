import React from 'react';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../firebase';
import { ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const SignOutButton = ({ firebase }) => (
	<ListItem style={{width: 250}} button key={"out"} onClick={firebase.doSignOut}>
		<ListItemIcon >
			<MeetingRoomIcon/>
		</ListItemIcon>
  		<ListItemText primary="Log Out" />
  	</ListItem>
);

export default withFirebase(SignOutButton);
