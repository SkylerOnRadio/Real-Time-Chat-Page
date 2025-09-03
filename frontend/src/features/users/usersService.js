import axios from 'axios';

// Axios instance pointing to backend container
const API = axios.create({
	baseURL: '/api',
	withCredentials: true,
});

const getUser = async (username) => {
	const res = await API.post('/api/users/user', { username });
	return res.data;
};

const userService = { getUser };

export default userService;
