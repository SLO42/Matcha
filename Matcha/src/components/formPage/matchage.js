import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles(theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	formControl: {
	  margin: 'auto',
	  minWidth: 120,
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
  }));


const MatchAgeSlider = ({profile, checkStage}) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
	  min: '',
	  max: '',
	  name: 'hai',
	});
  
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
	  setLabelWidth(inputLabel.current.offsetWidth);
	}, []);
  
	const setMin = async() => await (profile.wants.prefage.min = state.min < state.max ? state.min : state.max);
	const setMax = async() => await (profile.wants.prefage.max = state.max > state.min ? state.max : state.min);

	const update = () => {
		setTimeout( () => { setMin(); setMax(); }, 5000);
		setMin();
		setMax();
		if (state.min !== '' && state.max !== '') checkStage(3);
	}

	const handleChange = name => event => {
	  setState({
		...state,
		[name]: event.target.value,
	  });
	  	update();
	};

	let options = [18, 19, 20]

	let i = 21;
	while (i !== 121)
	{
		options.push(i);
		i++;
	}
	const DisplayOptions = () => options.map(i => (
		<option value={i}>{i}</option>
	))
//   const handleChange = (event, newValue) => {
// 	setValue(newValue);
// 	profile.wants.prefage.min = value[0];
// 	profile.wants.prefage.max = value[1];
//   };

  return (
	<div className={classes.root}>
	    <FormControl variant="outlined" className={classes.formControl} onMouseOut={update}>
			<InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
				Age a
			</InputLabel>
			<Select
				native
				required
				value={state.min}
				onChange={handleChange('min')}
				input={
					<OutlinedInput name="min" labelWidth={labelWidth} id="outlined-age-native-simple" />
				}
			>
				<option value=""/>
				<DisplayOptions />
			</Select>
      </FormControl>
	  <FormControl variant="outlined" className={classes.formControl} onMouseOut={update}>
			<InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
				Age b
			</InputLabel>
			<Select
				native
				required
				value={state.max}
				onChange={handleChange('max')}
				input={
					<OutlinedInput name="max" labelWidth={labelWidth} id="outlined-age-native-simple" />
				}
			>
				<option value=""/>
				<DisplayOptions />
			</Select>
      </FormControl>
	</div>
  );
}

export default MatchAgeSlider;
