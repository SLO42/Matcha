import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
});

userSchema.statics.findByLogin = async (login) => {
	let user = await this.findOne({
		username: login,
	});

	if (!user) {
		user = await this.findOne({ email: login });
	}

	return user;
};

userSchema.pre('remove', (next) => {
	this.model('Message').deleteMany({ user: this._id }, next);
});
1
const User = mongoose.model('User', userSchema);

export default User;