import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset } from '../features/auth/authSlice';

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const userData = { username, password };
		dispatch(register(userData));
	};

	useEffect(() => {
		if (isError) toast.error(message);
		if (isSuccess) {
			navigate('/');
			toast.success('User Registered!');
		}
		dispatch(reset());
	}, [isError, isSuccess, message, navigate, dispatch]);

	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
			<form
				onSubmit={onSubmit}
				className="bg-white shadow-xl rounded-2xl p-8 w-96 transform transition duration-300 hover:scale-105"
			>
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Create an Account
				</h2>

				<input
					type="text"
					placeholder="Username"
					className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					name="username"
					value={username}
					onChange={onChange}
					required
				/>

				<input
					type="password"
					placeholder="Password"
					className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					name="password"
					value={password}
					onChange={onChange}
					required
				/>

				<button
					type="submit"
					disabled={isLoading}
					className={`w-full text-white py-3 rounded-lg transition duration-200 ${
						isLoading
							? 'bg-indigo-400 cursor-not-allowed'
							: 'bg-indigo-600 hover:bg-indigo-700'
					}`}
				>
					{isLoading ? 'Registering...' : 'Register'}
				</button>
			</form>
		</div>
	);
}
