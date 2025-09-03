import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import userReducer from '../features/users/usersSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chats: chatReducer,
		user: userReducer,
	},
});
