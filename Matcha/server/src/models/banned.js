import mongoose from 'mongoose';

const bannedSchema = new mongoose.Schema({
	bannedUsers: [{
		user: String,
		email: String,
		reason: String,
		TOB: {type: Date, default: Date.now},
	}],
})

const BannedUsers = mongoose.model("BannedUsers", bannedSchema);

export default BannedUsers;