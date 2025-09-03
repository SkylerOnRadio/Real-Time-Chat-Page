import express from 'express';

import {
	registerUser,
	loginUser,
	logoutUser,
	getSender,
	getUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/sender/:id', getSender);
router.post('/user', getUser);

export default router;
