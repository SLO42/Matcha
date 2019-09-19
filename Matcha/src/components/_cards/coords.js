import React from 'react';
import LocationDisplaysMain from '../location';

class CoordsCard extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			lat: 0.0,
			lon: 0.0,
			edit: 0,
		};
	}

	componentDidMount() {
		this.setState({loading: true});
		if (this.props.profile){
			const prof = this.props.profile;
			if (prof.location){
				const location = prof.location;
				this.setState({lat: location.lat, lon: location.lon});
			}
		}
		if (this.props.lat) this.setState({lat: this.props.lat})
		if (this.props.lon) this.setState({lon: this.props.lon})
		if (this.props.edit) this.setState({edit: this.props.edit})
		this.setState({loading: false});
	}

	render() {
		const {lat, lon, loading, edit} = this.state;
		return (
			loading ? <p>"loading.."</p> :
			<LocationDisplaysMain profile={this.props.profile} lat={lat} lon={lon} edit={edit}/>
		)
	}
}

export default CoordsCard;