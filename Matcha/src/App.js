import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import checkLocationPermission from "./components/getLocation/locationpermission";
import Taskbar from './components/taskbar/taskbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormPage from './components/formPage';
import SignUpPage from './components/signup';
import * as ROUTES from './components/constants/routes';
import Navigation from './components/navigation';
import {withAuthentication, withAuthorization, }  from './components/session';
import SignInPage from './components/signin';
import AccountPage from './components/account';
import HomePage from './components/home';
import Status from './components/status';
import ProfilePage from './components/profile';
import ProfileCreation from './components/profileCreation';
import Background from './background.png';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import LandingPage from './components/landing';
import BlockUserCard from './components/block/block';
import ReportUserCard from './components/report/report';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
        main: '#ffeb3b',
    },
    progress: {
    }
},
});

const styles = {
  container: {
    minHeight: "100vh",
    textAlign: 'center',
    minWidth: '100vw',
    background: `url(${Background}) no-repeat`,
    backgroundSize: '100vw 100vh',
    position: "flex",
    fontSize: 'calc(10px + 2vmin)',
    color: 'rgba(255, 255, 255, 0.6)',
    flexGrow: 1,
  },
  taskbar: {
    paddingBottom: '5vh',
  }
};

class App extends Component {
  constructor(props) {
	super(props)
	
	if (this.props.firebase.auth.currentUser){
		this.props.profile.doGetProfileWithAuth(this.props.firebase.auth.currentUser.uid)
	}
    this.state = {
		weatherInformation: null,
      city: null,
      isRendering: false,
	  isLocationEnabled: true,
	  searchData: {},
	};
	
  }

  async componentDidMount() {
    const permissionState = await checkLocationPermission();
    if(permissionState === "denied") {
      this.setState({ isLocationEnabled: false });
      return;
    } else if (permissionState === "granted") {
      this.setState({ isLocationEnabled: true });
      return;
    } else {
      this.setState({ isLocationEnabled: false });
      navigator.geolocation.getCurrentPosition(() => {
        this.setState({ isLocationEnabled: true });
      });
    }
  }

  getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(position => {
        let location = { lat: position.coords.latitude, lng: position.coords.longitude };

        this.setState((prevState, props) => {
          let newState = { ...prevState };

          newState.center = location;
          newState.locations[`${prevState.current_user}`] = location;

          return newState;
        });

        axios.post("http://localhost:3000/update-location", {
          username: this.state.current_user,
          location: location
        }).then(res => {
          if (res.status === 200) {
            console.log("new location updated successfully");
          }
        });
      })
    } else {
      alert("Sorry, geolocation is not available on your device. You need that to use this app");
    }
  }


  render() {
    const {
      isRendering,
	  isLocationEnabled,
    } = this.state;

    if (!isLocationEnabled) {
      return (
        <div className="bg-dark">
          <div className="warning">
            <h3 className="u-font-size-s u-nowrap">Enable Permission Bitch 🖕</h3>
          </div>
        </div>
      );
    }

    return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div style={styles.container}>
					{isRendering &&
						<div>
							<CircularProgress color="secondary"/>
						</div>
          }
          <div style={styles.taskbar}>
          <Taskbar/>
		  <Status/>
          </div>
        <Route path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.PROFILE} component={ProfilePage} />
				<Route path={ROUTES.PROFILE_CREATION} component={ProfileCreation}/>
				<Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.REPORT_USER} component={ReportUserCard} />
        <Route path={ROUTES.BLOCK_USER} component={BlockUserCard} />
        </div>
			</Router>
		</MuiThemeProvider>
    )
  }
}


export default withAuthentication(App);