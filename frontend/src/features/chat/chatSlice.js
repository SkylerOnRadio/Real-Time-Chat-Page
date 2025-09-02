import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatService from './chatService';

const senders = JSON.parse(localStorage.getItem('senders'));
const messages = JSON.parse(localStorage.getItem('messages'));

const initialState = {
	senders: senders ? senders : [],
	messages: messages ? messages : [],
	newMsg: false,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: null,
};

export const getChatters = createAsyncThunk(
	'messages/senders',
	async (thunkAPI) => {
		try {
			return await chatService.getChatters();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getMessages = createAsyncThunk(
	'messages/',
	async (id, thunkAPI) => {
		try {
			return await chatService.getMessages(id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const postMessage = createAsyncThunk(
	'/messages/add',
	async (msgData, thunkAPI) => {
		try {
			return await chatService.postMessage(msgData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getChatters.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(getChatters.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.senders = [];
				state.message = action.payload;
			})
			.addCase(getChatters.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.senders = action.payload;
			})
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.messages = [];
				state.message = action.payload;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.messages = action.payload;
			})
			.addCase(postMessage.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(postMessage.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(postMessage.fulfilled, (state, action) => {
				state.newMsg;
				state.isLoading = false;
				state.isSuccess = true;
			});
	},
});

export const { reset } = chatSlice.actions;

export default chatSlice.reducer;
