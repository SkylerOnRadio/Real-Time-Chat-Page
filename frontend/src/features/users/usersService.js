import axios from 'axios';

const getUser = async (username) => {
	const res = await axios.post('/api/users/user', username);

	return res.data;
};

const userService = { getUser };

export default userService;
