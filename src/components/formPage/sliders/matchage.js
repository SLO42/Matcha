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
  return `${value}°C`;
}

const MatchAgeSlider = ({userObj}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 99]);

  const handleChange = (event, newValue) => {
	setValue(newValue);
	userObj.prefage.min = value[0];
	userObj.prefage.max = value[1];
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Your Age Preference
      </Typography>
      <Slider
        value={value}
		onChange={handleChange}
		min={18}
		max={99}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
	  {value[0] + " - " + value[1]}
    </div>
  );
}

export default MatchAgeSlider;
