import { io } from 'socket.io-client';

const socket = io('http://backend:5000', {
	transports: ['websocket'], // force WebSocket, skip polling
});

export default socket;
