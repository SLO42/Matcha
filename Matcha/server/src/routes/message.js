import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const messages = await req.context.models.Message.find();
	return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findById(
		req.params.messageId,
	);
	return res.send(message);
})

router.get('/myMessages', async (req, res) => {
	const messageList = await req.context.models.Message.find(
		{
			$or: [ { creator: req.body.username }, { invited: req.body.username } ]
		}
	)
})


router.post('/', async (req, res) => {
	const message = await req.context.models.Message.create({
		text: req.body.text,
		to: req.body.to,
		from: req.body.from,
	});
	return res.send(message);
});

router.delete('/messages/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findById(
		req.params.messageId,
	);
	let result = null;
	if (message) {
		result = await message.remove();
	}

	return res.send(result)
});

export default router;
