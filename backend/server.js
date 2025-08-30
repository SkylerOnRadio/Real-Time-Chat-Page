import express from 'express';

import { connectDb } from './config/connectDB.js';
import messages from './routes/messagesRoutes.js';
import users from './routes/userRoutes.js';

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/messages', messages);
app.use('/api/users', users);

app.listen(3000, (req, res) => {
	console.log('Server Started!');
});
