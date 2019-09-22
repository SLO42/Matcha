import React from 'react';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withAuthentication, AuthUserContext } from '../session';
import * as ROUTES from '../constants/routes';
import { CardContent, Card, CardActions, TextField, ButtonBase } from '@material-ui/core';
import { sendEmail, doMongoDBGetUserWithAuthUsername } from '../axios';


class ConvoPageBase extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			text: "",
			loading: true,
			messages: [],
			convo: "",
			users: [],
		}
	}

	componentDidMount() {
		this.setState({loading: true});

		this.props.firebase.convoUsers(this.props.match.params.id).on('value', snapshot => {
			const users = snapshot.val();

			this.setState({users});
		})

		this.setState({convo: this.props.match.params.id})
		this.props.firebase.messages(this.props.match.params.id).
		on('value', snapshot => {
			const mesObj = snapshot.val();

			if (mesObj){
				this.setState({
					messages: mesObj,
					loading: false,
				});
			} else{
				this.setState({messages: null, loading: false});
			}
		})


	}

	componentWillUnmount() {
		this.props.firebase.messages(this.state.convo).off();
		this.props.firebase.convoUsers(this.props.match.params.id).off();
	}

	CommentList = ({ messages, firebase }) => (
		<ul key={"start"}>
			{messages.map((message, index) => (
				<this.CommentItem key={index} index={index} message={message} firebase={firebase}/>
			))}
		</ul>
	)

	CommentItem = ({ index, message, firebase }) => {

		return (
		<li key={index}>
			<strong>{message.user}: </strong> {message.txt}
		</li>
	)}

	onCreateComment = () => {
		const {users} = this.state;
		const user1 = users[0];
		const user2 = users[1];
		const you = this.props.authUser.username
		const match = you === user1 ? user2 : user1;

		this.props.firebase.doSendText(this.state.convo, this.props.authUser, this.state.text);
		doMongoDBGetUserWithAuthUsername(match).then(
			res => {
				sendEmail({email: res.email}).then(ress => console.log(ress));
			}
		)
		this.setState({ text: "" });
	};

	onChangeText = event => {
		this.setState({ text: event.target.value });
	};

	render(){
		const {loading, messages, text} = this.state;
		return(
			<Card>

			<CardContent>
				{loading && <div>Loading...</div>}

				{messages ? (
					<Card>
						<this.CommentList messages={messages} firebase={this.props.firebase} />
					</Card>
				): (
					<div> There are no messages ... </div>
				)}
				<TextField id="CommentBox" label="Send your match a message <3" multiline fullWidth
					onChange={this.onChangeText} value={text} />
					<ButtonBase disabled={ messages ? !messages.length : 1} onClick={this.onCreateComment}> Submit</ButtonBase>
			</CardContent>
					</Card>
		)
	}

}

const Convo = () => <AuthUserContext.Consumer>
	{authUser => authUser ? <ConvoPage authUser={authUser}/> : null}
</AuthUserContext.Consumer>

const ConvoPage = compose(
	withRouter,
	withFirebase,
	withAuthentication,
)(ConvoPageBase);

export default Convo;