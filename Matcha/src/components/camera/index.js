import React from 'react';
import Webcam from "react-webcam";


class MyCamera extends React.Component{
	constructor (props)
	{
		super(props)
		this.state = {
			currentPic: null,
		
			photo: {
				ori: "",
				thumbnail: "",
				timeStamp: '',
			},
			replaced: null,
			}
		}

	componentDidMount() {
		this.setState({ loading: true });
		}

	componentWillUnmount() {

	}


	reset = () => {
		if (this.state.replaced){
			this.setState({replaced: null});
			this.props.updatePhoto(null);
		}
	}

	setRef = webcam => {
		this.webcam = webcam;
	  };
	

	capture = async () => {
		let picture = await this.webcam.getScreenshot();
		if (picture === null) {
			return;
		}


		const now = new Date().toLocaleString();
		let newpic = {
			ori: picture,
			thumbnail: picture,
			timeStamp: now,
		};
		this.props.updatePhoto(picture);
		this.setState({photo: newpic, replaced: picture});
		this.setState(this.state);
	  };

	render() {
		const videoConstraints = {
			  width: 720,
			  heigh: 640,
			  facingMode: "user"
		  };
		const { replaced } = this.state;
		  return (
				<div className="MyCameraStart" style={{display: 'flex'}}>
					<div className="Smile" style={{width: 320, height: 220, display: 'flex', justifyContent: 'inherit'}}>
					{!replaced ? (
						<Webcam
						audio={false}
						height={220}
						ref={this.setRef}
						screenshotFormat="image/jpeg"
						width={320}
						videoConstraints={videoConstraints}
						/>
						) : (<img src={replaced} alt={replaced} style={{width: 320, height: 220, display: 'flex', justifyContent: 'inherit'}} ></img>)}
					</div>
					<div style={{margin: 'auto', alignContent: 'center'}}>
						{ replaced ? 
						!this.props.saved ? (<button onClick={this.reset}>reset Photo</button>) : null : 
						(<button onClick={this.capture}>Capture photo</button>)}
					</div>
				</div>
				)}
}


export default (MyCamera);