import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PublicRoute({ children }) {
	const { user } = useSelector((state) => state.auth);

	if (user) {
		toast.error('You are already logged in!');
		return <Navigate to="/chat" replace />;
	}

	return children;
}
