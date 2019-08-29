import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
	if (value === null) { value = 0;}
  return `${value}°C`;
}

let height = (value) => {
	let feet = Math.floor(value / 12);
	let inch = value % 12;
	return feet + "ft " + inch + "in"; 
}

const MatchHeightSlider = ({profile}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(profile ? 
	[profile.wants.prefheight.min, profile.wants.prefheight.max]: [18, 300]);

  const handleChange = (event, newValue) => {
	setValue(newValue);
	profile.wants.prefheight.min = value[0];
	profile.wants.prefheight.max = value[1];
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Your Height Preference
      </Typography>
      <Slider
		value={value}
		min="18"
		max="300"
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
	  {height([value[0]]) + " - " + height(value[1])}
    </div>
  );
}

export default MatchHeightSlider;
