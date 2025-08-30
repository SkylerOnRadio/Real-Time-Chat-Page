import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, 'Have to have a message to be put.'],
		},
		from: { type: String, required: [true, 'Who are you?'] },
		to: { type: String, required: [true, 'Who do you even want to talk to?'] },
	},
	{ timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
