import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import Profile from './profile';
import BannedUsers from './banned';

// connect to MongoDB with Mongoose. using ENV
const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL, { 
		auth: {
			user: process.env.DATABASE_USER_AUTH,
			password: process.env.DATABASE_PASS_AUTH,
		},
		useNewUrlParser: true,
	 });
};

const models = { User, Message, Profile, BannedUsers };

export { connectDb };

export default models;
