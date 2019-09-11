import React, { Component } from 'react';
import {getOnline, updataOnline} from '../axios';
import { AuthUserContext } from '../session';
export default class StatusHandler extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			loading: true,
			online: [],
			onlineCount: [],
			onlineMatched: [],
			onlineMachedCount: [],
		}
	}

	// loopTest = () => {
	// 	this.setState({loading: true});
	// 	getOnline().then(res => {
	// 		const server = res.data[0];
	// 		const online = server.online;
	// 		const onlineCount = online.length;
	// 		this.setState({online, onlineCount, loading: false});
	// 	}).then(() => setTimeout(this.loopTest, 15000))
	// }

	UpdateStatus = ({authUser}) => {
		updataOnline(authUser.uid).then(res => {
			console.log(res);
			this.setState({loading: false})
		})

		return (<div></div>)

	}


	componentDidMount(){
		this.setState({loading: true});

		getOnline().then(async res => {
			if (await res){
				const server = res.data[0];
				const online = server.online;
				const onlineCount = online.length;
				this.setState({online, onlineCount, loading: false});
			} else{
				this.setState({loading: false});
			}
		})
		setTimeout(this.setState({loading: true}), 5000);
	}
	render() {
		const {loading, online, onlineCount} = this.state;
      return (
   		<div>
			   <AuthUserContext.Consumer>
				   {authUser => (
					   loading ?  <div> </div> : <div><p>yes</p></div>)
					//    <this.UpdateStatus authUser={authUser}/>)
				   }
			   </AuthUserContext.Consumer>
    	</div>
      )};
}