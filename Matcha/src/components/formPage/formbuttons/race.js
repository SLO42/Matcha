
// REMOVED BECAUSE WHY?!?!?! RACE IS BAD;

// import React from "react";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import { green, yellow, purple } from "@material-ui/core/colors";
// import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
// import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
// import { withStyles } from "@material-ui/core/styles";

// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600]
//     }
//   },
//   checked: {}
// })(props => <Radio color="default" {...props} />);

// const YellowRadio = withStyles({
//   root: {
//     color: yellow[400],
//     "&$checked": {
//       color: yellow[600]
//     }
//   },
//   checked: {}
// })(props => <Radio color="default" {...props} />);

// const PurpleRadio = withStyles({
//   root: {
//     color: purple[400],
//     "&$checked": {
//     //   color: purple[600]
//     }
//   },
//   checked: {}
// })(props => <Radio color="default" {...props} />);


// const options = [
// 	{name: 'Orc', color: 0}, 
// 	{name: 'Elf', color: 1},
// 	{name: 'Human', color: 2},
// 	{name: 'Gnome', color: 0},
// 	{name: 'Goliath', color: 2},
// 	{name: 'Drawf', color: 1},
// 	{name: 'Halfling', color: 0},
// 	{name: 'Half-Elf', color: 2},
// 	{name: 'Half-Orc', color: 1},
// ];

// const FormLabelController = () => {
// 	return options.map((value) => {
// 		if (value.color === 2){
// 			return (
// 				<FormControlLabel
// 					value={value.name}
// 					control={<PurpleRadio color="primary" />}
// 					label={value.name}
// 					labelPlacement="top"
// 				/>
// 			);
// 		} else if (value.color === 1) {
// 			return (
// 				<FormControlLabel
// 					value={value.name}
// 					control={<YellowRadio color="primary" />}
// 					label={value.name}
// 					labelPlacement="top"
// 				/>
// 			);
// 		} else if (value.color === 0) {
// 			return (
// 				<FormControlLabel
// 					value={value.name}
// 					control={<GreenRadio color="primary" />}
// 					label={value.name}
// 					labelPlacement="top"
// 				/>
// 			);
// 		}
// 	})
// };

// const FormControlLabelPosition = ({profile}) => {
//   const [value, setValue] = React.useState("none");

//    function handleChange(event) {
// 	setValue(event.target.value);
// 	profile.race = event.target.value;
//   }

//   return (
//     <FormControl component="fieldset" required>
//       <FormLabel component="legend">Choose Your Race</FormLabel>
//       <RadioGroup
// 		aria-label="position" name="position" value={value}
// 		onChange={handleChange} row
//       >
// 		  <FormLabelController/>
//       </RadioGroup>
//     </FormControl>
//   );
// }


// export default FormControlLabelPosition;

