import axios from 'axios';

const API_URL = 'api/users/';

const register = async (userData) => {
	const res = await axios.post(API_URL + 'register', userData);

	if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
	return res.data;
};

const login = async (userData) => {
	const res = await axios.post(API_URL + 'login', userData);
	return res.data;
};

const authService = { register, login };

export default authService;
