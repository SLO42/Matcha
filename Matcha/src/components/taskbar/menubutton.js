import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles =  createMuiTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
        main: '#33bfff',
    }
},
});

class MenuButton extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    /* const { classes } = this.props; */
    const listItems = this.props.items.map((link) =>
      <MenuItem key={"handle"} onClick={this.handleClose} >{link}</MenuItem>
    );

    return (
      <div>
        <MuiThemeProvider theme={styles}>
        {listItems}
        </MuiThemeProvider>
      </div>
    );
  }

}

export default MenuButton;
