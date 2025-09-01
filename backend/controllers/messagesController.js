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
		return next(new Error(`Database Error: ${error}`));
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
	const sender = req.params.id;
	const user = req.user.id;

	try {
		const messages = await Message.find({
			$or: [
				{ from: sender, to: user },
				{ from: user, to: sender },
			],
		}).sort({ createdAt: -1 });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500);
		return next(new Error(`Database error: ${error.message}`));
	}
});

export const getUniqueSenders = expressAsyncHandler(async (req, res, next) => {
	try {
		const user_id = req.user._id;
		console.log(user_id);
		const chatters = await Message.aggregate([
			// 1. Match only messages for the receiver
			{ $match: { to: user_id } },

			// 2. Sort by createdAt DESC (latest first)
			{ $sort: { createdAt: -1 } },

			// 3. Group by senderId, take the first (latest) message
			{
				$group: {
					_id: '$from',
					message: { $first: '$text' },
					createdAt: { $first: '$createdAt' },
					receiverId: { $first: '$to' },
				},
			},

			// 4. (Optional) Sort results by latest time across all senders
			{ $sort: { createdAt: -1 } },
		]);

		res.status(201).json(chatters);
	} catch (error) {
		res.status(500);
		return next(new Error(`Error: ${error.message}`));
	}
});
