import bcrypt from 'bcrypt';
import expressAsyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

export const registerUser = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400);
		return next(new Error('Please fill all the fields!'));
	}

	const exists = await User.findOne({ username: username });
	if (exists) {
		res.status(400);
		return next(new Error('User already exists.'));
	}

	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(password, salt);

	try {
		const user = await User.create({
			username,
			password: hashed,
		});
		generateToken(res, user.username);
		res.status(201).json({ user: user.username, id: user._id });
	} catch (error) {
		res.status(500);
		return next(new Error(`Database Error: ${error}`));
	}
};

export const loginUser = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400);
		return next(new Error('Please fill all the fields.'));
	}

	const user = await User.findOne({ username: username });
	if (!user) {
		res.status(400);
		return next(new Error('User does not exist.'));
	}

	if (await bcrypt.compare(password, user.password)) {
		generateToken(res, username);
		res.status(200).json({ username: user.username, id: user._id });
	} else {
		res.status(400);
		return next(new Error('Wrong password.'));
	}
};

export const logoutUser = async (req, res, next) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json('Logged out');
};

export const getSender = expressAsyncHandler(async (req, res, next) => {
	try {
		const sender_id = req.params.id;
		console.log(sender_id);

		const sender = await User.findById(sender_id)
			.select('username -_id')
			.sort({ createdAt: -1 });
		if (!sender) {
			res.status(403);
			return next(new Error('Sender does not exist.'));
		}

		res.status(200).json(sender);
	} catch (error) {
		res.status(500);
		return next(new Error(`Error : ${error.message}`));
	}
});

export const getUser = expressAsyncHandler(async (req, res, next) => {
	const { username } = req.body;

	if (!username) {
		res.status(400);
		return next(new Error('Please fill all the fields.'));
	}

	const user = await User.findOne({ username: username }).select('-password');

	res.status(200).json(user);
});
