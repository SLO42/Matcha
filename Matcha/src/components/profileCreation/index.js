import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FormButtons from '../formPage';
import { withFirebase } from '../firebase';
import { AuthUserContext, withAuthorization} from '../session';
import { compose } from 'recompose';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#333',
      },
      secondary: {
        main: '#ffeb3b',
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

class ProfileCreation extends React.Component {
    render() {
        return(
        <MuiThemeProvider theme={theme}>
        <div>
            <h1 style={{color: "#ffff00"}}>
                CREATE YOUR PROFILE
            </h1>
			<AuthUserContext.Consumer>
				{authUser => (
					<FormButtons authUser={authUser}/>
				)}
			</AuthUserContext.Consumer>
        </div>
      </MuiThemeProvider>
        );
    };
}

const condition = authUser => !!authUser;

export default compose(
	withStyles(styles),
	withFirebase,
	withAuthorization(condition),
)(ProfileCreation);


// export default withStyles(styles)((withFirebase((ProfileCreation))));