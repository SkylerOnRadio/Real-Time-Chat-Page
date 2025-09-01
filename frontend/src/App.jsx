import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/">
				<Route index element={<Homepage />} />
				<Route path="/chat" element={<Chatpage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
