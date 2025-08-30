import express from 'express';

import { connectDb } from './config/connectDB.js';
import messages from './routes/messagesRoutes.js';

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/messages', messages);

app.listen(3000, (req, res) => {
	console.log('Server Started!');
});
