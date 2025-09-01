import expressAsyncHandler from 'express-async-handler';
import { Message } from '../models/messageModel.js';
import User from '../models/userModel.js';

export const postMessage = expressAsyncHandler(async (req, res, next) => {
	const { text, to } = req.body;

	if (!text || !to) {
		res.status(400);
		return next(new Error('Please fill all the fields.'));
	}

	let receiver;

	try {
		receiver = await User.findOne({ username: to }).select('-password');
		if (!receiver) {
			res.status(401);
			return next(new Error('The receiver does not exist.'));
		}
	} catch (error) {
		res.status(500);
		return next(new Error('Database Error: ', error));
	}

	const sender = req.user._id;

	if (sender == receiver._id) {
		res.status(401);
		return next(new Error('You cannot send a message to yourself.'));
	}

	try {
		const message = await Message.create({
			text,
			from: sender,
			to: receiver._id,
		});
		res.status(201).json({
			message: 'Message Created',
			message: message,
		});
	} catch (error) {
		res.status(400);
		return next(new Error(`Error occurred while creating message: ${error}`));
	}
});

export const getMessages = expressAsyncHandler(async (req, res, next) => {
	const { name } = req.params;

	try {
		const messages = await Message.find({ to: name });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500);
		return next(new Error(`Database error: ${error.message}`));
	}
});
