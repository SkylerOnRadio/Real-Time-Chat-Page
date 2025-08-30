import jwt from 'jsonwebtoken';

const generateToken = (res, username) => {
	const token = jwt.sign({ username }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000,
	});
};

export default generateToken;
