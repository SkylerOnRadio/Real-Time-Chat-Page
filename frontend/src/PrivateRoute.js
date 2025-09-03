import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (!user) {
		return navigate('/register');
	}

	return children;
}
