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
import { withAuthentication } from './components/session';
import SignInPage from './components/signin';
import AccountPage from './components/account';
import HomePage from './components/home';
import ProfilePage from './components/profile';
import ProfileCreation from './components/profileCreation';



import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import UserCard from './components/userCard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
        main: '#33eaff',
    },
    progress: {
    },
},
});


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weatherInformation: null,
      city: null,
      isRendering: false,
      isLocationEnabled: true
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
      // get the longitude & latitude then update the map center as the new user location
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
      isLocationEnabled
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
      <div backgroundColor="#26282a">
        {isRendering &&
        <div>
          <CircularProgress color="secondary"/>
        </div>
        }
        <Taskbar/>
        <Navigation/>
        </div>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
			<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			<Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.PROFILE_CREATION} component={ProfileCreation}/>
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.FIND_USERS} component={UserCard} />
        </Router>
        </MuiThemeProvider>
    )
  }
}

export default withAuthentication(App);