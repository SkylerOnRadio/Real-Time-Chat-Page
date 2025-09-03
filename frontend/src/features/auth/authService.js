import axios from 'axios';

const API_URL = 'api/users/';

const register = async (userData) => {
	const res = await axios.post(API_URL + 'register', userData);

	if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
	return res.data;
};

const login = async (userData) => {
	const res = await axios.post(API_URL + 'login', userData);

	if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
	return res.data;
};

const logout = async () => {
	localStorage.removeItem('user');
	const res = await axios.get(API_URL + 'logout');
	return res.data;
};

const authService = { register, login, logout };

export default authService;
