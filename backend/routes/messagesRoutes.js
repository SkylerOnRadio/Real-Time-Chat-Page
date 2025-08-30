import express from 'express';

import { postMessage, getMessages } from '../controllers/messagesController.js';

const router = express.Router();

router.post('/', postMessage);
router.get('/:name', getMessages);

export default router;
