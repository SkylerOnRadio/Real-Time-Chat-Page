import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please enter an username.'],
		unique: true,
	},
	password: { type: String, required: [true, 'Please add a password.'] },
});

const User = mongoose.model('User', userSchema);

export default User;
