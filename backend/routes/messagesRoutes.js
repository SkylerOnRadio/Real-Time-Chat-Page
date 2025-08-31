import express from 'express';

import { postMessage, getMessages } from '../controllers/messagesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, postMessage);
router.get('/:name', protect, getMessages);

export default router;
