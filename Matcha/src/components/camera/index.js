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
		await this.setState({photo: newpic, replaced: picture});
		await this.setState(this.state);
	  };

	render() {
		const videoConstraints = {
			  width: 720,
			  heigh: 640,
			  facingMode: "user"
		  };
		const { replaced } = this.state;

		const fileChangedHandler = async event => {
			if (event.target.files !== null){
				await this.setState({
					replaced: event.target.files[0]
				})
				if (this.state.replaced) {
					await this.setState({ replaced: URL.createObjectURL(this.state.replaced)})
				}
			} else {
				this.setState({ replaced: null })
			}
		  }
  

		  return (
				<div className="MyCameraStart" style={{position: 'relative'}}>
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
					<input type="file" onChange={fileChangedHandler} />
					<div style={{margin: 'auto', alignContent: 'center'}}>
						<button onClick={this.capture}>Capture photo</button>
					</div>
				</div>
				)}
}


export default (MyCamera);