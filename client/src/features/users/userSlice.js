import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser(state) {
			state = action.payload
		}
	},
})