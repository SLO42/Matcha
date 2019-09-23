import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2c387e',
      },
      secondary: {
          main: '#33eaff',
      }
  },
  });
  
  const styles = theme => ({
    root: {
      width: '100%',
      paddingBottom: "40px",
    }
});

export function SimpleRating() {
    const [value, setValue] = React.useState(2);
  
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
    );
  }

class ProfilePage extends React.Component {
    render() {
        return(
        <MuiThemeProvider theme={theme}>
        <div>
            <p>
                ADD ERROR CODE FOR THIS PAGE AS REDIRECT WHEN SOMETHING FAILS
            </p>
        </div>
      </MuiThemeProvider>
        );
    };
}

export default withStyles(styles)(ProfilePage);