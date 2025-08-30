import mongoose from 'mongoose';
import colors from 'colors';

export const connectDb = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected ${db.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(`${error}`.red.underline);
		process.exit(1);
	}
};
