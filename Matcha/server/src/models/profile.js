import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
	username: String,
	firstname: String,
	lastname: String,
	mystats: {
		race: String,
		bodytype: String,
		myheight: Number,
		myage: Number,
		mysex: String,
		interest: [String],
		bio: String,
	},
	wants: {
		prefheight: { 
			min: Number,
			max: Number,
		},
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
		profile = await this.findOne({ firstname: username });
	}
	
	return profile;
}

profileSchema.statics.findByGender = async function (gender) {
	let profile = await this.find({
		mysex: gender
	});
	
	return profile;
}

profileSchema.pre('remove', (next) => {
	this.module('User').deleteMany({ user: this._id }, next);
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;