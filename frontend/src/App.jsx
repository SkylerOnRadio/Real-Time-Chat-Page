import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import Register from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './PrivateRoute.js';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Homepage />} />
				<Route
					path="/chat"
					element={
						<PrivateRoute>
							<Chatpage />
						</PrivateRoute>
					}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<LoginPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
