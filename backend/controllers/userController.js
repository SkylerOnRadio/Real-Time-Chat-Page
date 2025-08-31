import bcrypt from 'bcrypt';

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
		res.status(201).json({ user: user.username });
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
		res.status(200).json({ username: user.username });
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
