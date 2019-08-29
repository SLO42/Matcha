import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
	reportie: String,
	reported: [{uid: String, reason: String}]
})

reportSchema.statics.findByReportie = async function (reportie) {
	let report = await this.findOne({
		reportie,
	})
	return report;
}
reportSchema.statics.findByReported = async function (uid) {
	let reports = await this.find({'reported.uid': uid })
	return reports;
}

const Report = mongoose.model('Report', reportSchema);

export default Report;