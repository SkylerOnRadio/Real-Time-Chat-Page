import bcrypt from 'bcrypt';

import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

export const registerUser = async (req, res) => {
	const { username, password } = req.body;

	if ((!username, !password))
		return res.status(401).json('Please enter all the fields.');

	const exists = await User.findOne({ username: username });
	if (exists) return res.status(401).json('A user already exists.');

	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(password, salt);

	try {
		const user = User.create({
			username,
			password: hashed,
		});
		generateToken(res, user.username);
		res.status(201).json({ user: user.username });
	} catch (error) {
		res.status(500).json(`Error creating form: ${error}`);
	}
};

export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res.status(401).json('Enter all the fields');

	const user = await User.findOne({ username: username });
	if (!user) return res.status(401).json('No such user exists.');

	if (await bcrypt.compare(password, user.password)) {
		generateToken(res, username);
		res.status(200).json({ username: user.username });
	} else res.status(400).json('Wrong Password.');
};

export const logoutUser = async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		export: new Date(0),
	});
	res.status(200).json('Logged out');
};
