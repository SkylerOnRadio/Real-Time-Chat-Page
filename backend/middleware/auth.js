import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findOne({ username: decoded.username }).select(
				'-password'
			);
			return next();
		} catch (error) {
			return res.status(403).json('Not Authorized');
		}
	} else {
		return res.status(401).json('No token provided');
	}
});
