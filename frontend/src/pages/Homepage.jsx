import chatImg from '../assets/Chats.svg';
import { Link } from 'react-router-dom';

const Homepage = () => {
	return (
		<>
			<div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
				{/* Navbar */}
				<nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
					<h1 className="text-2xl font-bold text-blue-600">Chatify</h1>
					<div className="space-x-4">
						<button className="px-4 py-2 text-gray-700 hover:text-blue-600">
							Features
						</button>
						<button className="px-4 py-2 text-gray-700 hover:text-blue-600">
							Pricing
						</button>
						<button className="px-4 py-2 text-gray-700 hover:text-blue-600">
							About
						</button>
						<Link to="/login">
							<button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
								Login
							</button>
						</Link>
					</div>
				</nav>

				{/* Hero Section */}
				<section className="flex flex-col md:flex-row items-center justify-between px-12 py-20">
					<div className="max-w-lg text-center md:text-left">
						<h2 className="text-5xl font-extrabold leading-tight text-gray-800">
							Connect <span className="text-blue-600">instantly</span> with your
							team
						</h2>
						<p className="mt-6 text-lg text-gray-600">
							A real-time chat platform designed for speed, security, and
							seamless collaboration.
						</p>
						<div className="mt-8 space-x-4">
							<Link to="/chat">
								<button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg">
									Start Chatting
								</button>
							</Link>
							<button className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-lg font-medium">
								Learn More
							</button>
						</div>
					</div>

					<img
						src={chatImg}
						alt="Illustration of chat bubbles"
						className="w-full max-w-md mt-12 md:mt-0"
					/>
				</section>

				{/* Features Section */}
				<section className="px-12 py-20 bg-white">
					<h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
						Why Choose Chatify?
					</h3>
					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						<div className="shadow-md rounded-xl p-6 text-center bg-gray-50 hover:shadow-lg transition">
							<div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
								💬
							</div>
							<h4 className="text-xl font-semibold mt-4">
								Real-Time Messaging
							</h4>
							<p className="text-gray-600 mt-2">
								Stay connected with instant updates and zero lag communication.
							</p>
						</div>
						<div className="shadow-md rounded-xl p-6 text-center bg-gray-50 hover:shadow-lg transition">
							<div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
								🔒
							</div>
							<h4 className="text-xl font-semibold mt-4">Secure & Private</h4>
							<p className="text-gray-600 mt-2">
								End-to-end encryption ensures your conversations stay safe.
							</p>
						</div>
						<div className="shadow-md rounded-xl p-6 text-center bg-gray-50 hover:shadow-lg transition">
							<div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
								⚡
							</div>
							<h4 className="text-xl font-semibold mt-4">Lightning Fast</h4>
							<p className="text-gray-600 mt-2">
								Optimized for speed with scalable architecture.
							</p>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="mt-auto bg-gray-900 text-gray-400 py-6 px-8 text-center">
					<p>© 2025 Chatify. All rights reserved.</p>
				</footer>
			</div>
		</>
	);
};

export default Homepage;
