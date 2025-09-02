const SenderBar = ({ sender }) => {
	return (
		<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out">
			<p className="font-medium">{sender.username}</p>
			<p className="text-xs text-gray-500">{sender.message}</p>
		</li>
	);
};

export default SenderBar;
