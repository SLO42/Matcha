import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import TemporaryDrawer from './menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import { withRouter} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';

let results = "";

const apiSearch = async (query) => {
	results = "";
	const createSearch = query => {
		let ret = "";
		const params = query.split(" ");
		let ammountofvalues = params.length;
		let i = 0;
		while (ammountofvalues--) {
			let param = params[i++];
			param = param.charAt(0).toUpperCase() + param.slice(1);
			// search by $or: {{wants.prefsex: {`${currentuser.mystats.mysex}`}, {"Bisexual"}}}
			const interets =
				param === "Camping" || param === "Coffee" ||  param ===  "Beer" ||
				param === "Wine Tasting" || param === "Gaming" || param === "Karaoke" ||
				param === "Religion" || param === "Shopping" || param === "Star Gazing" || param === "Running" ||
				param === "Handicap Access" || param === "Travel" || param === "Theatre" || param === "Cooking" ||
				param === "Biking" || param === "Fishing" || param === "Smoking" ||
				param === "Concerts" || param === "Hunting" || param === "Reading";
				
				const firstAdd = ret === "";
			if (param === "Male" || param === "Female") {
				if (firstAdd){
					ret = `mystats.mysex=${param}`;
				} else {
					ret = `${ret}_mystats.mysex=${param}`;
				}
			}
			else if (interets){
				if (firstAdd){
					ret = `mystats.interest=${param}`;
				} else {
					ret = `${ret}_mystats.interest=${param}`;
				}
			}
		}
		return ret;
	}

	await axios.get(`http://localhost:3001/search/p_${createSearch(query)}_all`).then(async res => {;
		
		let filter = res.data.filter(obj => obj.__v);

		await filter.map(async (profileObject) => {
			results += ` | ${profileObject.username}`;
			return (
				<div>
				<Paper>
					<p>
						
						${profileObject.username}
						</p>
				</Paper>
				</div>
			)
		})
		results += ' |';
		return res;
	}).catch(err => {if (err) return err});
} 

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#333',
      },
      secondary: {
          main: '#ffeb3b',
      },
      progress: {
      },
  },
  });

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color: '#ffeb3b'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#ffeb3b',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));



const PrimarySearchAppBar = ({authUser, history, firebase}) => {
  const classes = useStyles();


  const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <IconButton
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//     >
//       {/* <MenuItem onClick={}>Profile</MenuItem>
//       <MenuItem onClick={}>My account</MenuItem> */}
//     </IconButton>
//   );

  const [value, setValue] = React.useState("");
  const [dang, setDang] = React.useState(0);
  const changeSearch = event => {
	setValue(event.target.value);
}
  const changeDang = () => {
	if (authUser){
		firebase.doGetUnread(authUser).then(res => {
			setDang(res);
		});
	}
}

  const _handleKeyDown = (e) => {
	  if (e.key === 'Enter') {
		apiSearch(value);
	  }
  }
  changeDang();

  const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// 	  open={isMobileMenuOpen}
//     //   items={[<Navigation/>]}
//     >
//       <MenuItem>
//         <IconButton aria-label="Show 4 new mails" color="">
//           <Badge badgeContent={dang} color="secondary">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label="Show 11 new notifications" color="">
//           <Badge badgeContent={11} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label="Account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color=""
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
            <TemporaryDrawer/>
			<ButtonBase onClick={() => {history.push(ROUTES.HOME)}}>
				<Typography className={classes.title} variant="h6" noWrap>
					MATCHA
				</Typography>
			</ButtonBase>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase /* this is where The Search Bar is */ 
              placeholder="Search…"
              classes={{
				  root: classes.inputRoot,
				  input: classes.inputInput,
				}}
				value={value}
				onChange={changeSearch}
				onKeyDown={_handleKeyDown}
				inputProps={{ 'aria-label': 'Search' }}
				/>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="Show 4 new mails" color="secondary" onClick={() => {history.push(ROUTES.LANDING)}}>
              <Badge badgeContent={dang} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="Show 17 new notifications" color="secondary">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => {history.push(ROUTES.PROFILE)}}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={() => window.alert("you pressed it")}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <div>
	  </div>
      </AppBar>
      {results !== "" ?<h1> {results} </h1> : null }
	{/* //   <h1 style={{color: "#ffff00"}}>Waiting For search</h1>} */}
    </div>
    </MuiThemeProvider>
  );
}

const TaskBar = compose(
	withRouter,
	withFirebase,
)(PrimarySearchAppBar);

export {apiSearch};

export default TaskBar;