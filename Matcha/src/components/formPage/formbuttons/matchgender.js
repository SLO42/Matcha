import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { pink, cyan, green  } from "@material-ui/core/colors";
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
  

const CyanRadio = withStyles({
  root: {
    color: cyan[400],
    "&$checked": {
      color: cyan[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const PinkRadio = withStyles({
  root: {
    color: "#FF80AB",
    "&$checked": {
      color: "#FF80AB"
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const FormControlLabelPosition = ({userObj}) => {
  const [value, setValue] = React.useState("none");

  function handleChange(event) {
	setValue(event.target.value);
	userObj.prefsex = event.target.value;
  }

  return (
    <FormControl component="fieldset" required>
      <FormLabel component="legend">What is your Sexual Prefrence?</FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="Male"
          control={<PinkRadio color="primary" />}
          label="Male"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Female"
          control={<CyanRadio color="primary" />}
          label="Female"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Bisexual"
          control={<GreenRadio color="primary" />}
          label="All of the above"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default FormControlLabelPosition;
