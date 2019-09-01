import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Card, Grid } from '@material-ui/core';

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
// 	  {children}
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


const myHeightSlider = ({profile}) => {
	// const [value, setValue] = React.useState("none");

	const onChangeCommitted = (event, value) => {
		// console.log(value);
		
		profile.mystats.myheight = value;
		return height();
	}

	let height = (value) => {
		let feet = value / 12;
		// let inch = value % 12;
		return feet + "ft " ; 
	}

	const markers = Array.from({length: 301}, (x, i) => ({"value": i, "label": height(i)}));
	let marked = markers.filter( (ele) => {
		return (ele.value >= 18);
	})
	marked = marked.filter ( ele => {
		return ele.value % 12 == 0
	}) 
  return (
    <Paper >
		<Typography gutterBottom>Your Height</Typography> 
		<Slider aria-label="MyHightSlider" defaultValue={profile ? profile.mystats.myheight : 60} min={18} max={300} 
		onChangeCommitted={onChangeCommitted} marks={marked} valueLabelDisplay={"auto"}/>
	  {/* <PrettoSlider valueLabelDisplay="auto" aria-label="Pretto slider" defaultValue={20} min={18} max={9999} /> */}
	  {/* no "Matcha/src/components/sliders/myheight.js" is just bad and hard to work with... */}
    </Paper>
  );
}

export default myHeightSlider;

