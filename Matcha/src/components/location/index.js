import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import checkLocationPermission from "../getLocation/locationpermission";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));



export const LocationDisplay = ({profile}) => {
	
	const [lat, setLat] = React.useState(profile.location ? profile.location.lat : 0);
	const [long, setLon] = React.useState(profile.location ? profile.location.lon : 0);


	const updatelat = event => {
		setLat(event.target.value);
	}
	const updatelon = event => {
		setLon(event.target.value);
	}
	
return (
	<form autoComplete="off">
        <Paper style={{width: "40vw"}}>
        <TextField
		onChange={updatelat}
        id="outlined-disabled"
        label="Latitude"
        defaultValue={lat}
        margin="normal"
        variant="outlined"
      />
       <TextField
        onChange={updatelon}
        id="outlined-disabled"
        label="Longitude"
        defaultValue={long}
        margin="normal"
        variant="outlined"
		/>
        </Paper>
    </form>
  );
}

export default function LocationDisplays(lat, long) {
return (
	<form autoComplete="off">
		<Paper style={{width: "40vw"}}>
		<TextField
		disabled
		id="outlined-disabled"
		label="Latitude"
		defaultValue={lat}
		margin="normal"
		variant="outlined"
		/>
		<TextField
		disabled
		id="outlined-disabled"
		label="Longitude"
		defaultValue={long}
		margin="normal"
		variant="outlined"
		/>
		</Paper>
	</form>
	);
}