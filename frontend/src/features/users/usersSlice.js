import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './usersService';

const initialState = {
	chatter: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: null,
};

export const getUser = createAsyncThunk(
	'/getUser',
	async (username, thunkAPI) => {
		try {
			return await userService.getUser(username);
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

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
				state.isSuccess = false;
				state.message = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.chatter = action.payload;
			});
	},
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
