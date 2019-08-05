import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import checkLocationPermission from "./components/getLocation/locationpermission";
import Taskbar from './components/taskbar/taskbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Race from './components/formPage/formbuttons/race';
// import Body from './components/formPage/formbuttons/gaybody';
// import Straight from './components/formPage/formbuttons/straightbody';
// import Interests from './components/formPage/formbuttons/interests';
// import MyHeightSlider from './components/formPage/sliders/myheight.js.js';
// import MyAgeSlider from './components/formPage/sliders/myage.js.js';
// import MatchHeightSlider from './components/formPage/sliders/matchheight.js.js';
// import MatchAgeSlider from './components/formPage/sliders/matchage.js.js';
// import GenderChoice from './components/formPage/formbuttons/yourgender';
// import SexualPreference from './components/formPage/formbuttons/matchgender';
import FormPage from './components/formPage';


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
      <div backgroundColor="#26282a">
        {isRendering &&
        <div>
          <CircularProgress color="secondary"/>
        </div>
        }
        <Taskbar/>
{/*         <Geosuggest
          ref={el => (this._geoSuggest = el)}
          placeholder="Search city name"
          onSuggestSelect={this.onSuggestSelect}
        /> */}
        </div>
		<FormPage />
			{/* <Race/>
			<br/>
			<Body/>
			<br/>
			<Straight/>
			<br/>
			<Interests/>
			<br/>
			<MyHeightSlider/>
			<MyAgeSlider/>
			<MatchAgeSlider/>
			<MatchHeightSlider/>
			<GenderChoice/>
			<br/>
			<SexualPreference/> */}
        <div textColor="#26FFFF">
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
          </p>
        </div>
        </MuiThemeProvider>
    )
  }
}

export default App;