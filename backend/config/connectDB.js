import mongoose from 'mongoose';
import colors from 'colors';

//connects to atlas
const MONGO_URL =
	process.env.MONGO_URL ||
	'mongodb://admin:chatapp%40321@mongo:27017/chatapp?authSource=admin';

export const connectDb = async () => {
	const connectWithRetry = async (retries = 5, delay = 5000) => {
		try {
			const db = await mongoose.connect(MONGO_URL);
			console.log(`✅ MongoDB connected: ${db.connection.host}`.cyan.underline);
		} catch (error) {
			if (retries === 0) {
				console.log(`❌ MongoDB connection failed, exiting...`.red.underline);
				process.exit(1);
			}
			console.log(
				`⚠️  MongoDB not ready, retrying in ${delay / 1000}s...`.yellow
			);
			setTimeout(() => connectWithRetry(retries - 1, delay), delay);
		}
	};

	await connectWithRetry();
};
