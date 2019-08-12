import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
	reportie: String,
	reported: [{username: String, reason: String}]
})

reportSchema.statics.findByReportie = async function (reportie) {
	let report = await this.findOne({
		reportie,
	})
	return report;
}

const Report = mongoose.model('Report', reportSchema);

export default Report;