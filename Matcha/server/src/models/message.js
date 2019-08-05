import mongoose from 'mongoose';


//message schema nothing new.
const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
});

const Message = mongoose.model('Message', messageSchema);

export default Message;