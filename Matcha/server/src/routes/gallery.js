import { Router } from 'express';

const router = Router;

// generic search on gallery for all objects
router.get('/', async (req, res) => {
	const userGalleries = await req.context.models.Gallery.find();
	return res.send(userGalleries);
})

// for new users with no pictures only.
router.post('/add', async (req, res) => {
	const userGallery = await req.context.models.Gallery.create({
		username: req.context.me,
		gallery: req.body.gallery,
	})
	return res.send(userGallery);
})
// for updating galleries that are already made. Should Be sent with Newimg and Imgnum
router.put('/update', async (req, res) => {
	const userGalleryUpdate = await req.context.models.Gallery.findAndModify({
		query: {username: req.context.me}, // looks for me
		update: { $set: { "gallery.$[elem]": req.body.newimg } }, //sets gallery.$[elem] to newimg
		arrayFilters: [ { elem : req.body.imgnum } ] // sets $[elem] to imgnum 
	})
})
router.delete('/remove', async (req, res) => {
	const imgnum = req.body.imgnum;
	const userGalleryRemove = await req.context.models.Gallery.findAndModify({remove: true,}).
		where('username').all(req.context.me).
		where(`gallery.${imgnum}`).all();
	return res.send(userGalleryRemove);
})