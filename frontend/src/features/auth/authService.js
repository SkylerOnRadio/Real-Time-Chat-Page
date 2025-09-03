import axios from 'axios';

const API = axios.create({
	baseURL: '/api',
	withCredentials: true,
});

const register = async (userData) => {
	const res = await API.post('/api/users/register', userData);

	if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
	return res.data;
};

const login = async (userData) => {
	const res = await API.post('/api/users/login', userData);

	if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
	return res.data;
};

const logout = async () => {
	localStorage.removeItem('user');
	const res = await API.get('/api/users/logout');
	return res.data;
};

const authService = { register, login, logout };

export default authService;
