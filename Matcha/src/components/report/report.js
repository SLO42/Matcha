import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BlockIcon from '@material-ui/icons/Block';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import { IconButton } from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../firebase';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const CustomizedMenu = ({history, user}) =>{
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

//   const onBlock = () => {
// 	history.push(ROUTES.BLOCK_USER)
//   }

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ReportIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem component={Link} to={{
			pathname: ROUTES.BLOCK_USER,
			user: user,
		}}>
          <ListItemIcon >
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="block" />
        </StyledMenuItem>
        <StyledMenuItem
		component={Link} to={{
			pathname: ROUTES.REPORT_USER,
			user: user,
		}}
		>
          <ListItemIcon>
            <ReportProblemIcon />
          </ListItemIcon>
          <ListItemText primary="report" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

const CustomizedMenus = withRouter(CustomizedMenu);

export {CustomizedMenus};

 const ReportUserCard = ({location, history, firebase}) => {
  const classes = useStyles();

	if (!location.user){
		history.goBack();
	}

	const reportAndBoucne = () => {
		firebase.doReportUser(location.user, window.prompt("Reason?"));
		firebase.doBlockUser(location.user);
		history.push(ROUTES.PROFILE);
	}

	const bounce = () => {
		history.goBack();
	}

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://image.shutterstock.com/image-photo/man-feeling-shy-hates-being-260nw-1270182640.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Are you sure you want to report  {location.user ? location.user : "user"}?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            You will no longer be able to send/recieve messages from this user and the moderation team will look into the issue. Thank you for reporting :)
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={reportAndBoucne}>
            {/*add onclick for report/block to send api call to userid and report | block */}
          Yes, report this bitch
        </Button>
        <Button size="small" color="primary" onClick={bounce}>
          Nah JK
        </Button>
      </CardActions>
    </Card>
  );
}
export default withFirebase(ReportUserCard);