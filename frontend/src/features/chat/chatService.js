import axios from 'axios';

const API = axios.create({
	baseURL: '/api',
	withCredentials: true,
});

const getChatters = async () => {
	const res = await API.get('/api/messages/senders');

	if (res.data) localStorage.setItem('senders', JSON.stringify(res.data));
	return res.data;
};

const getMessages = async (id) => {
	const res = await API.get(`/api/messages/${id}`);

	if (res.data) localStorage.setItem('messages', JSON.stringify(res.data));
	return res.data;
};

const postMessage = async (msgData) => {
	const res = await API.post('/api/messages', msgData);
	return res.data;
};

const chatService = { getChatters, getMessages, postMessage };

export default chatService;
