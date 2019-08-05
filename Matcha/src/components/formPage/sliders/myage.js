import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: 300 + 24 * 2,
//     padding: 24,
//   },
//   margin: {
//     height: theme.spacing(3),
//   },
// }));

// function ValueLabelComponent(props) {
//   const { children, open, value } = props;

//   const popperRef = React.useRef(null);
//   React.useEffect(() => {
//     if (popperRef.current) {
//       popperRef.current.update();
//     }
//   });

//   return (
//     <Tooltip
//       PopperProps={{
//         popperRef,
//       }}
//       open={open}
//       enterTouchDelay={0}
//       placement="top"
//       title={value}
//     >
//       {children}
//     </Tooltip>
//   );
// }

// ValueLabelComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   open: PropTypes.bool.isRequired,
//   value: PropTypes.number.isRequired,
// };


// const PrettoSlider = withStyles({
//   root: {
//     color: '#52af77',
//     height: 8,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus,&:hover,&$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

const myAgeSlider = ({userObj}) => {
	const onChangeCommitted = (event, value) => {
		// console.log(value);
		
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
	  {/* <PrettoSlider valueLabelDisplay="auto" aria-label="Pretto slider" defaultValue={20} /> */}
	  no "Matcha/src/components/sliders/myage.js" is just a bad and hard to work with...
    </Paper>
  );
};

export default myAgeSlider;
/* 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="age-required">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          name="age"
          inputProps={{
            id: 'age-required',
          }}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        </InputLabel>
      </FormControl>
    </form>
  );
} */

