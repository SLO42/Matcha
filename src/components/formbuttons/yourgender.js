import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { pink, cyan } from "@material-ui/core/colors";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { withStyles } from "@material-ui/core/styles";

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

export default function FormControlLabelPosition() {
  const [value, setValue] = React.useState("female");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">What is your Sex?</FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="top"
          control={<PinkRadio color="primary" />}
          label="Male"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<CyanRadio color="primary" />}
          label="Female"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}

