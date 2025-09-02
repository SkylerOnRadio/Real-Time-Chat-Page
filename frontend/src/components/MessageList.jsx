import { useSelector } from 'react-redux';

const MessageList = ({ messages }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className="flex-1 p-4 space-y-3 overflow-y-auto">
			{messages.length > 0 ? (
				messages.map((msg, idx) => (
					<div
						key={idx}
						className={`flex ${
							msg.from === user.id ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`px-4 py-2 rounded-lg max-w-xs ${
								msg.from === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
							}`}
						>
							<p>{msg.text}</p>
						</div>
					</div>
				))
			) : (
				<p className="text-gray-400">No messages yet</p>
			)}
		</div>
	);
};

export default MessageList;
