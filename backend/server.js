import express from 'express';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';

import { Message } from './models/messageModel.js';
import { connectDb } from './config/connectDB.js';
import messages from './routes/messagesRoutes.js';
import users from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const PORT = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// REST API routes
app.use('/api/messages', messages);
app.use('/api/users', users);

app.use(errorHandler);

const server = http.createServer(app);

// 🚨 Only Socket.IO CORS — no express cors() here
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL || 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

io.on('connection', (socket) => {
	console.log('✅ User connected:', socket.id);

	socket.on('join', (userId) => {
		socket.join(userId);
	});

	socket.on('sendMessage', async ({ text, to, from }) => {
		console.log('📩 Message received:', text);

		try {
			// Save to DB
			const message = await Message.create({ text, from, to });

			// Populate sender + receiver if needed
			const fullMessage = await Message.findById(message._id)
				.populate('from', 'username')
				.populate('to', 'username');

			// Emit to both participants
			io.to(to).emit('receivedMessage', fullMessage);
			io.to(from).emit('receivedMessage', fullMessage);
		} catch (error) {
			console.error('❌ Error saving message:', error);
		}
	});
});

server.listen(PORT, () => {
	console.log(`🚀 Server started on port ${PORT} with Socket.IO`);
});
