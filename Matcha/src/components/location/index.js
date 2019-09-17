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


class LocationDisplaysMain extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			lat: 0.0,
			long: 0.0,
			edit: 0,
		}
	};

	LocationDisplays = () => {
		const {lat, long, edit} = this.state; 

		const onChangelat = event => {
			const filter = /^([\d]*)$|^([\d]+)+(\.{1})([\d]+)+$|^([\d]*)(\.{1})$/gm;
	
			if(filter.test(event.target.value)){
				this.editLat(event.target.value);
			} else {
				console.log("nah");
			}
		}
		const onChangelon = event => {
			const filter = /^([\d]*)$|^([\d]+)+(\.{1})([\d]+)+$|^([\d]*)(\.{1})$/gm;
	
			if(filter.test(event.target.value)){
				this.editLong(event.target.value);
			} else {
				console.log("nah");
			}
		}
	return (
	
		edit ? (
			<form autoComplete="off">
			<Paper style={{width: "40vw"}}>
			<TextField
			id="outlined-disabled"
			label="Latitude"
			onChange={onChangelat}
			defaultValue={this.state.lat}
			value={lat}
			margin="normal"
			variant="outlined"
			/>
		   <TextField
			id="outlined-disabled"
			onChange={onChangelon}
			label="Longitude"
			defaultValue={this.state.long}
			value={long}
			margin="normal"
			variant="outlined"
			/>
			</Paper>
		</form>
	  ) : (
			<form autoComplete="off">
				<Paper style={{width: "40vw"}}>
				<TextField
				disabled
				id="outlined-disabled"
				label="Latitude"
				defaultValue={this.state.lat}
				value={lat}
				margin="normal"
				variant="outlined"
				/>
			<TextField
			disabled
				id="outlined-disabled"
				label="Longitude"
				defaultValue={this.state.long}
				value={long}
				margin="normal"
				variant="outlined"
				/>
				</Paper>
			</form>
		)
	  );
	}

	componentDidMount() {
		this.setState({loading: true})
		if (this.props.lat) this.setState({lat: this.props.lat})
		if (this.props.lon) this.setState({long: this.props.lon})
		if (this.props.edit) this.setState({edit: this.props.edit})
		this.setState({loading: false})
	};

	editLat = val => {
		this.setState({lat: val})
		this.props.profile.location.lat = val;
		
	}
	editLong = val => {
		this.setState({long: val})
		this.props.profile.location.lon = val;

	}
	
	render() {
		const {loading, lat, long, edit} = this.state;

		return(
			loading ? <p>Loading...</p> :
			<this.LocationDisplays 
				edit={edit}
			/>
		);
	}
}



export default LocationDisplaysMain;

