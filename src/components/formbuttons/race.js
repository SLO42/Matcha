import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { green, yellow, purple } from "@material-ui/core/colors";
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

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600]
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
      <FormLabel component="legend">Choose Your Race</FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Orc"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<YellowRadio color="primary" />}
          label="Elf"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Human"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Gnome"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Goliath"
          labelPlacement="top"
        />
         <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Dwarf"
          labelPlacement="top"
        />
         <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Halfling"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Half-Elf"
          labelPlacement="top"
        />
         <FormControlLabel
          value="top"
          control={<PurpleRadio color="primary" />}
          label="Half-Orc"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}

