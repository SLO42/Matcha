import mongoose from 'mongoose';

const userGallery = new mongoose.Schema({
	username: String,
	gallery: {0: String, 1: String, 2: String, 3: String, 4: String},
})

userGallery.statics.findByUsername = async function (user) {
	let gallery = await this.findOne({
		username: user,
	});

	return gallery;
}

const Gallery = mongoose.model("Gallery", userGallery);

export default Gallery;