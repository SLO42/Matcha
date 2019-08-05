import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { green, yellow, purple, blue } from "@material-ui/core/colors";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { withStyles } from "@material-ui/core/styles";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color: purple[400],
    "&$checked": {
      color: purple[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const options = [
	{name: "Blonde/Brunette/Ginger xD", color: 2},
	{name: "Tall", color: 1},
	{name: "T H I C C", color: 0},
	{name: "short", color: 1},
	{name: "thin mint", color: 1},
	{name: "Athletic", color: 0},
	{name: "Heavyset", color: 2},
];

const FormLabelController = () => {
	return options.map((value) => {
		if (value.color === 2){
			return (
				<FormControlLabel
					value={value.name}
					control={<PurpleRadio color="primary" />}
					label={value.name}
					labelPlacement="top"
				/>
			);
		} else if (value.color === 1) {
			return (
				<FormControlLabel
					value={value.name}
					control={<BlueRadio color="primary" />}
					label={value.name}
					labelPlacement="top"
				/>
			);
		} else if (value.color === 0) {
			return (
				<FormControlLabel
					value={value.name}
					control={<GreenRadio color="primary" />}
					label={value.name}
					labelPlacement="top"
				/>
			);
		}
	})
};


const FormControlLabelPosition = ({userObj}) => {
  const [value, setValue] = React.useState("female");

  function handleChange(event) {
	setValue(event.target.value);
	userObj.bodytype = event.target.value;
  }

  return (
    <FormControl component="fieldset" required>
      <FormLabel component="legend">Body Types</FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
		  <FormLabelController/>
      </RadioGroup>
    </FormControl>
  );
}

export default FormControlLabelPosition;
