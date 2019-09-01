import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const userGalleries = await req.context.models.Gallery.find({});
	return res.send(userGalleries);
})

// for new users with no pictures only.
// wondering if we should instead of username use fireid. so universial search;
router.post('/add', async (req, res) => {
	const userGallery = await req.context.models.Gallery.create({
		fireid: req.body.fireid,
		gallery: req.body.gallery,
	})
	return res.send(userGallery);
})
// for updating galleries that are already made. Should Be sent with Newimg and Imgnum
router.put('/update', async (req, res) => {
	let userGalleryUpdate = await req.context.models.Gallery.find().
	where("fireid").all(req.body.fireid).
	catch(err => {
		if (err){
			console.log("Error at finding fireID with context");
			console.log(err);
			console.log("Error at finding fireID with context");
			return(err);
		};
	});
	userGalleryUpdate.gallery = await req.body.gallery;
	return res.send(await userGalleryUpdate.save());
})

router.delete('/remove', async (req, res) => {
	const imgnum = req.body.imgnum;
	const userGalleryRemove = await req.context.models.Gallery.findAndModify({remove: true,}).
		where('username').all(req.context.me).
		where(`gallery.${imgnum}`).all();
	return res.send(userGalleryRemove);
})

export default router;