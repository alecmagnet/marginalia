import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
	"litTexts/fetchLitTextById", 
	async (id) => {
		const response = await fetch(`/users/${id}`)
		const data = await response.json()
		console.log(data)
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
			// const index = state.entities.findIndex((com) => parseInt(com.id) === parseInt(action.payload.id))
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