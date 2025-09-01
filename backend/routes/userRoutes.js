import express from 'express';

import {
	registerUser,
	loginUser,
	logoutUser,
	getSender,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/sender/:id', getSender);

export default router;
