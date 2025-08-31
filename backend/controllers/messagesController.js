import { Message } from '../models/messageModel.js';

export const postMessage = async (req, res, next) => {
	const { text, from, to } = req.body;

	if (!text || !from || !to) {
		res.status(400);
		return next(new Error('Please fill all the fields.'));
	}

	try {
		const message = await Message.create({
			text,
			from,
			to,
		});
		res.status(201).json({
			message: 'Message Created',
			message: message,
		});
	} catch (error) {
		res.status(400);
		return next(new Error(`Error occurred while creating message: ${error}`));
	}
};

export const getMessages = async (req, res, next) => {
	const { name } = req.params;

	try {
		const messages = await Message.find({ to: name });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500);
		return next(new Error(`Database error: ${error.message}`));
	}
};
