import express from 'express';

import { connectDb } from './config/connectDB.js';

connectDb();

const app = express();

app.listen(3000, (req, res) => {
	console.log('Server Started!');
});
