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
	const user = req.user._id;
	console.log(sender, user);

	try {
		const messages = await Message.find({
			$or: [
				{ from: sender, to: user },
				{ from: user, to: sender },
			],
		}).sort({ createdAt: 1 });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500);
		return next(new Error(`Database error: ${error.message}`));
	}
});

export const getUniqueSenders = expressAsyncHandler(async (req, res, next) => {
	try {
		const user_id = req.user._id;

		const chatters = await Message.aggregate([
			// 1. Messages where user is either sender or receiver
			{
				$match: {
					$or: [{ to: user_id }, { from: user_id }],
				},
			},

			// 2. Add chatterId = the "other" participant
			{
				$addFields: {
					chatterId: {
						$cond: {
							if: { $eq: ['$from', user_id] },
							then: '$to',
							else: '$from',
						},
					},
				},
			},

			// 🚫 2b. Exclude self
			{ $match: { chatterId: { $ne: user_id } } },

			// 3. Sort by createdAt DESC (latest first)
			{ $sort: { createdAt: -1 } },

			// 4. Group by chatterId (keep only the latest message per chatter)
			{
				$group: {
					_id: '$chatterId',
					message: { $first: '$text' },
					createdAt: { $first: '$createdAt' },
				},
			},

			// 5. Lookup chatter details from User collection
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'chatter',
				},
			},

			// 6. Flatten chatter
			{ $unwind: '$chatter' },

			// 7. Keep only username + chatterId + latest message
			{
				$project: {
					_id: 0,
					username: '$chatter.username',
					chatter_id: '$_id',
					message: 1,
					createdAt: 1,
				},
			},

			// 8. Sort conversations by latest again
			{ $sort: { createdAt: -1 } },
		]);

		res.status(200).json(chatters);
	} catch (error) {
		res.status(500);
		return next(new Error(`Error: ${error.message}`));
	}
});
