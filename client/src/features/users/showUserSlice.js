import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
	"litTexts/fetchLitTextById", 
	async (id) => {
		const response = await fetch(`/api/users/${id}`)
		const data = await response.json()
    return data
	})

const showUserSlice = createSlice({
	name: "showText",
	initialState: {
		entities: [],
		status: "idle",
		errors: null,
	},
	reducers: {
		updateShowUser(state, action) {
			state.entities = action.payload
			state.status = "idle"
		},		
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserById.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
			.addCase(fetchUserById.rejected, (state, action) => {
				state.errors = action.payload.errors
				state.status = "error"
			})
	},
})

export const { updateShowUser } = showUserSlice.actions
export default showUserSlice.reducer