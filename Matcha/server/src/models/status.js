import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
	name: String,
	online: [String], 
})

statusSchema.statics.findByUsername = async function (username) {
	let result = await this.findOne({name: 'server'});
	if (result){
		if (result.online){
			let status = false;
			const list = result.online;
			list.map(user => {
				if (user === username){
					status = true;
				}
			})
			return status;
		}
	}
	return false;
}

const Status = mongoose.model("Status", statusSchema);

export default Status 