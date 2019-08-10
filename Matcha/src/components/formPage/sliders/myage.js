import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';


const myAgeSlider = ({userObj}) => {
	const onChangeCommitted = (event, value) => {
		userObj.myage = value;
	}

	const markers = Array.from({length: 100}, (x, i) => ({"value": i, "label": i}));
	let marked = markers.filter( (ele) => {
		return ele.value % 5 == 0;
	})


  return (
    <Paper >
      <Typography gutterBottom>Your Age</Typography>
	  <Slider aria-label="MyAgeSlider" defaultValue={20} min={18} max={99} 
		onChangeCommitted={onChangeCommitted} marks={marked} valueLabelDisplay={"auto"}/>
    </Paper>
  );
};

export default myAgeSlider;