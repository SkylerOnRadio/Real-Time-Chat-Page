import axios from 'axios';

const API_URL = '/api/messages/';

const getChatters = async () => {
	const res = await axios.get(API_URL + 'senders');

	if (res.data) localStorage.setItem('senders', JSON.stringify(res.data));
	return res.data;
};

const getMessages = async (id) => {
	const res = await axios.get(API_URL + id);

	if (res.data) localStorage.setItem('messages', JSON.stringify(res.data));
	return res.data;
};

const chatService = { getChatters, getMessages };

export default chatService;
