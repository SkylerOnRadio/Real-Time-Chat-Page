import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, 'Have to have a message to be put.'],
		},
		from: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
		to: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	},
	{ timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
