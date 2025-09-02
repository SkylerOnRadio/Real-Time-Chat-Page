import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SenderBar from '../components/SenderBar';
import {
	getChatters,
	getMessages,
	postMessage,
	reset,
} from '../features/chat/chatSlice';
import MessageList from '../components/MessageList';

export default function ChatPage() {
	const { senders, messages, isLoading } = useSelector((state) => state.chats);
	const dispatch = useDispatch();

	const [msg, setMsg] = useState('');

	const onChange = (e) => {
		setMsg(e.target.value);
	};

	const [selectedChat, setSelectedChat] = useState(null);

	useEffect(() => {
		dispatch(getChatters());
		dispatch(reset());
	}, [dispatch]);

	const handleSelectChat = (sender) => {
		setSelectedChat(sender);
		dispatch(getMessages(sender.chatter_id));
	};

	const onClick = async () => {
		const to = selectedChat.chatter_id;
		const msgData = { text: msg, to };
		dispatch(postMessage(msgData));
		setMsg('');
	};

	return (
		<div className="h-screen w-screen flex bg-gray-100">
			{/* Sidebar */}
			<aside className="w-1/4 bg-white shadow-md flex flex-col">
				<div className="p-4 border-b">
					<h2 className="font-bold text-lg">My Profile</h2>
					<p className="text-sm text-gray-500">Online</p>
				</div>

				{isLoading ? (
					<p className="p-4 text-gray-500">Loading chats...</p>
				) : senders.length > 0 ? (
					senders.map((sender) => (
						<div
							key={sender.username}
							onClick={() => handleSelectChat(sender)}
							className={`cursor-pointer ${
								selectedChat?.username === sender.username ? 'bg-blue-100' : ''
							}`}
						>
							<SenderBar sender={sender} />
						</div>
					))
				) : (
					<p className="p-4 text-gray-500">No chats yet.</p>
				)}
			</aside>

			{/* Chat Area */}
			<main className="flex-1 flex flex-col">
				{!selectedChat ? (
					<div className="flex-1 flex items-center justify-center text-gray-500">
						<p>Select a chat to start messaging</p>
					</div>
				) : (
					<>
						<div className="p-4 bg-white shadow-sm flex items-center">
							<h2 className="font-semibold text-lg">{selectedChat.username}</h2>
						</div>

						{/* Messages */}
						<MessageList messages={messages} />

						<div className="p-4 bg-white border-t flex">
							<input
								onChange={onChange}
								name="message"
								value={msg}
								type="text"
								placeholder="Type a message..."
								className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								onClick={onClick}
								className="ml-3 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
							>
								Send
							</button>
						</div>
					</>
				)}
			</main>
		</div>
	);
}
