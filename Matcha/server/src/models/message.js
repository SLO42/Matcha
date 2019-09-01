import mongoose from 'mongoose';


//message schema nothing new.
const messageSchema = new mongoose.Schema({
	creator: {
		type: String,
		required: true,
	},
	invited: {
		type: String,
		required: true,
	},
	convo: [
		{text :{
		type: String,
		required: true,
	},}],
	seen: Boolean,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;