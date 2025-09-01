import express from 'express';

import {
	postMessage,
	getMessages,
	getUniqueSenders,
} from '../controllers/messagesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, postMessage);
router.get('/senders', protect, getUniqueSenders);
router.get('/:id', protect, getMessages);

export default router;
