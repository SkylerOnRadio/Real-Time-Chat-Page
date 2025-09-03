import axios from 'axios';

const getUser = async (username) => {
	const res = await axios.post('/api/users/user', username);

	if (res.data) localStorage.setItem('chatter', JSON.stringify(res.data));

	return res.data;
};

const userService = { getUser };

export default userService;
