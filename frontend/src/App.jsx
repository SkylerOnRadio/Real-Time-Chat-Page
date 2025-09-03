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
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AboutPage from './pages/AboutPage';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Homepage />} />

				<Route path="/about" element={<AboutPage />} />

				{/* Protected Chat Page */}
				<Route
					path="/chat"
					element={
						<PrivateRoute>
							<Chatpage />
						</PrivateRoute>
					}
				/>

				{/* Auth pages should not be accessible when logged in */}
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
