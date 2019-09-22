import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import { withAuthentication, AuthUserContext } from '../session';
import { GridListTile, Card, GridList, CardActionArea, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doMongoDBGetProfileWithUserid } from '../axios';
import { isThisISOWeek } from 'date-fns/esm';

class LandingPageBase extends Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			convos: [],
			totalNotify: 0,
			keytree: [],
		}
	}

	 componentDidMount(){
		this.onListenForMatches().then(() => this.setState({loading: false}));
	}
	componentWillUnmount() {
		this.props.firebase.matches(this.props.authUser.uid).off();
		if (this.state.keytree.length){
			this.state.keytree.map(key => {
				this.props.firebase.convo(key).off();
			})
		}
	}
	

	onListenForMatches = async () =>{
		// this.setState({loading: true});
		await this.props.firebase.matches(this.props.authUser.uid)
			.on('value', snap => {
				const matchObj = snap.val();
				if (matchObj){
					Object.keys(matchObj).forEach(key => {
						this.props.firebase.convo(key).on('value', snapshot => {
							const convo = snapshot.val();
							if (!convo){
								this.setState({loading:true, keytree: [], convos: []})
							}
							else if(!this.state.keytree.includes(key)){
								this.state.keytree.push(key);
								this.state.convos.push(convo);
							}else{
								if (this.state.convos){
									this.state.convos.map((conObj, index) => {
										// if(conObj && convo){
											
											if (conObj.users[0] === convo.users[0] && conObj.users[1] === convo.users[1])
											{
												this.state.convos[index] = convo;
												this.setState({});
											}
										// }
									})
								}
							}
						})
					})
				} else {
					setTimeout( () => this.setState({convos: [], loading:true}), 1100);
				}
			})
	}

	ConvoCard = ({convo, index}) => {
		if (convo) {
			const user1 = convo.users[0];
			const user2 = convo.users[1];
			const you = this.props.authUser.username
			const match = you === user1 ? user2 : user1;
			return(
				<div>

			<Card className={"Convo"} style={{maxWidth: '10%', minWidth: '10%', justify: 'center'}}>
				<CardActionArea
					component={Link}
					to={{
						pathname: `${ROUTES.CONVOS}/${this.state.keytree[index]}`,
						state: {convo, seen: true},
					}}>
					<CardHeader style={{whiteSpace: 'nowrap', fontSize: '1em'}}
					 title={match} />
					 
					 <CardContent>
					 <Typography variant="body2" color="textSecondary" component="p" style={{wordWrap: 'none',}}>

							{convo.messages[convo.messages.length - 1].txt}
							</Typography>
					 </CardContent>
				</CardActionArea>
			</Card>

			 </div>
			)
		} else return null

	}
	
	fixstate = () => {
		setTimeout(this.setState({loading: true}), 450);
		setTimeout(this.setState({loading: false}), 2000);
	}
	
	ConvoList = () => {
		const {loading, convos, totalNotify} = this.state;
		if (convos && this.props.authUser){

			return (
				loading ? <p>loading...</p> :
				<div>
				<GridList cols={1} spacing={0} cellHeight={150} >

					{this.state.convos.map((obj, index) => (
						<GridListTile style={{minWidth: '10%'}} key={index}>
							<this.ConvoCard convo={obj} index={index} />
						</GridListTile>
					))}
				</GridList>
				</div>
			)
		} else {
			this.fixstate();
			return <div></div>
		}
	}


    render() {
	const {loading} = this.state;
		setTimeout(() => this.setState({loading: false}), 3000);
      return ( loading ? 
    <p>loading</p> : <this.ConvoList />

      )};
}


const Landing = compose(
	withFirebase,
	withAuthentication,
)(LandingPageBase)

const LandingPage = () => <AuthUserContext.Consumer>
	{authUser => (authUser ? <Landing authUser={authUser} /> : null ) }
</AuthUserContext.Consumer>

export default withFirebase(LandingPage);