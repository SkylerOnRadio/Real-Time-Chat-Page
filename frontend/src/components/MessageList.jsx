import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
	const { user } = useSelector((state) => state.auth);
	const endRef = useRef(null);

	// Auto-scroll when messages change
	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Helper: format dates
	const formatDate = (dateStr) => {
		const date = new Date(dateStr);
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		if (date.toDateString() === today.toDateString()) return 'Today';
		if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
		return date.toLocaleDateString([], {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});
	};

	// Group messages by date
	const groupedMessages = messages.reduce((groups, msg) => {
		const key = formatDate(msg.createdAt || new Date());
		if (!groups[key]) groups[key] = [];
		groups[key].push(msg);
		return groups;
	}, {});

	return (
		<div className="flex-1 p-4 space-y-3 overflow-y-auto">
			{Object.keys(groupedMessages).map((date) => (
				<div key={date}>
					{/* Date Separator */}
					<div className="flex justify-center my-4">
						<span className="text-xs font-semibold text-white bg-gray-600 px-4 py-1 rounded-full shadow-md">
							{date}
						</span>
					</div>

					{/* Messages */}
					{groupedMessages[date].map((msg, idx) => {
						const isOwnMessage =
							(msg.from?._id && msg.from._id === user.id) ||
							msg.from === user.id;

						const timestamp = msg.createdAt
							? new Date(msg.createdAt).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
							  })
							: '';

						return (
							<div
								key={idx}
								className={`flex ${
									isOwnMessage ? 'justify-end' : 'justify-start'
								} mb-2`}
							>
								<div
									className={`px-4 py-2 rounded-lg max-w-xs ${
										isOwnMessage
											? 'bg-blue-500 text-white'
											: 'bg-gray-200 text-black'
									}`}
								>
									<p>{msg.text}</p>
									<p
										className={`text-xs mt-1 text-right ${
											isOwnMessage ? 'text-gray-200' : 'text-gray-600'
										}`}
									>
										{timestamp}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			))}

			{/* Invisible element for auto-scroll */}
			<div ref={endRef} />
		</div>
	);
};

export default MessageList;
