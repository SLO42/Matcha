import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBox from '@material-ui/icons/AccountBox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navigation from '../navigation';
import * as ROUTES from '../constants/routes';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TTY from './tty.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2c387e',
      },
      secondary: {
          main: '#33eaff',
      },
  },
  });
  
  const styles = {
      tty: {
          width: "650px",
      },
      panel: {
          justify: "right",
          alignItems: "right",
          width: "30vw",
      },
  }

  const useStyles = makeStyles({
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 600,
      height: 600,
    },
    root: {
        width: '100%',
        paddingBottom: "40px",
      },
      notif: {
          height: 100,
          width: 600,
      },
      rightPanel: {
          position: 'right',
          justify: "right",
          height: "100vh",
          width: "30vw"
      },
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

export function ImageAvatars() {
    const classes = useStyles();
  
    return (
      <Grid container justify="left" alignItems="left" >
        <Avatar alt="Profile-Image" src={TTY} className={classes.bigAvatar} />
      </Grid>
    );
  }

export function Notifications() {
    const classes = useStyles();
  
    return (
      <Grid container justify="center" alignItems="center">
        <Paper className={classes.notif}>
                <p>
                    NEW NOTIFICATIONS
                </p>
            </Paper>
      </Grid>
    );
  }

  export function RightPanel() {
    const classes = useStyles();
  
    return (
      <Grid container justify="right" alignItems="right">
        <Paper className={classes.rightPanel}>
            <Notifications/>
            <SimpleRating/>
            </Paper>
      </Grid>
    );
  }

class ProfilePage extends React.Component {
    render() {
        return(
        <MuiThemeProvider theme={theme}>
        <div  style={styles.tty}>
            <ImageAvatars/>
        </div>
        <div style={styles.panel}>
        <RightPanel/>
        </div>
      </MuiThemeProvider>
        );
    };
}

export default (ProfilePage);