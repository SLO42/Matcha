import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
	fireid: String,
	username: String,
	firstname: String,
	lastname: String,
	mystats: {
		myage: Number,
		mysex: String,
		interest: [String],
		bio: String,
	},
	wants: {
		prefage: { 
			min: Number,
			max: Number,
		},
		prefsex: String,
	},
	fame: Number,
	location: {lon: Number, lat: Number},
	blocked: [String],
	reportedcount: Number,
})

profileSchema.statics.findByUsername = async function (username) {
	let profile = await this.findOne({
		username,
	});
	if (!profile) {
		profile = await this.findOne({ userid: username});
	};
	if (!profile) {
		profile = await this.findOne({ fireid: username});
	};
	if (!profile) {
		profile = await this.findOne({ _id: username});
	};
	// if (!profile) {
	// 	profile = await this.findOne({ firstname: username });
	// }
	return profile;
}

profileSchema.statics.findById = async function (id) {
	let profile = await this.findOne({userid: id});
	return profile;
}

profileSchema.statics.findByGender = async function (gender) {
	let profile = await this.find({
		mysex: gender
	});
	
	return profile;
}

// profileSchema.pre('remove', (next) => {
// 	this.module('User').deleteMany({ user: this._id }, next);
// });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;