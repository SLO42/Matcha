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

export default function FormControlLabelPosition() {
  const [value, setValue] = React.useState("female");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Body Types</FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Daddy"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Otter"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Bear"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Twink"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Twunk"
          labelPlacement="top"
        />
         <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Dwarf"
          labelPlacement="top"
        />
         <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Femboy"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<BlueRadio color="primary" />}
          label="Jock"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}

