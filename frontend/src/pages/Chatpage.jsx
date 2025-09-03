import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import SenderBar from '../components/SenderBar';
import {
	getChatters,
	getMessages,
	postMessage,
	reset,
} from '../features/chat/chatSlice';
import MessageList from '../components/MessageList';
import { getUser } from '../features/users/usersSlice';

export default function ChatPage() {
	const { senders, messages, isLoading } = useSelector((state) => state.chats);
	const { user, isError, isSuccess } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [msg, setMsg] = useState('');
	const [selectedChat, setSelectedChat] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		dispatch(getChatters());
		dispatch(reset());
	}, [dispatch]);

	const handleSelectChat = (sender) => {
		setSelectedChat(sender);
		dispatch(getMessages(sender.chatter_id));
	};

	const onClick = async () => {
		if (!selectedChat) return;
		const to = selectedChat.chatter_id;
		const msgData = { text: msg, to };
		dispatch(postMessage(msgData));
		setMsg('');
	};

	// Filter senders based on searchTerm
	const filteredSenders = senders.filter((sender) =>
		sender.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Handle search submit
	const handleSearch = async (e) => {
		if (e.key === 'Enter') {
			if (filteredSenders.length === 0 && searchTerm.trim()) {
				dispatch(getUser({ username: searchTerm }));
				setSearchTerm('');
			}
		}
	};

	useEffect(() => {
		if (isSuccess && user) {
			// If user exists, start chat
			const newChat = {
				username: user.username,
				chatter_id: user._id, // adjust key if backend sends different
			};
			setSelectedChat(newChat);
			dispatch(getMessages(newChat.chatter_id));
		} else if (isSuccess && user == null) {
			// If no user found
			toast.info('No user exists with that username');
		}
	}, [user, isSuccess, isError, dispatch]);

	return (
		<div className="h-screen w-screen flex bg-gray-100">
			{/* Sidebar */}
			<aside className="w-1/4 bg-white shadow-md flex flex-col justify-between">
				{/* Top section */}
				<div className="flex-1 flex flex-col">
					<div className="p-4 border-b">
						<h2 className="font-bold text-lg">My Profile</h2>
						<p className="text-sm text-gray-500">Online</p>
					</div>

					<div className="overflow-y-auto flex-1">
						{isLoading ? (
							<p className="p-4 text-gray-500">Loading chats...</p>
						) : filteredSenders.length > 0 ? (
							filteredSenders.map((sender) => (
								<div
									key={sender.username}
									onClick={() => handleSelectChat(sender)}
									className={`cursor-pointer ${
										selectedChat?.username === sender.username
											? 'bg-blue-100'
											: ''
									}`}
								>
									<SenderBar sender={sender} />
								</div>
							))
						) : (
							<p className="p-4 text-gray-500">No chats found.</p>
						)}
					</div>
				</div>

				{/* Bottom search box */}
				<div className="p-4 border-t">
					<input
						type="text"
						placeholder="Search chats..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={handleSearch}
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm"
					/>
				</div>
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
								onChange={(e) => setMsg(e.target.value)}
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
