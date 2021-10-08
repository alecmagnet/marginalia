import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
	"allUsers/fetchAllUsers", 
	async () => {
		const response = await fetch("/users")
		const data = await response.json()
    return data
	}
)

const initialState = {
	entities: [],
	status: "idle",
	errors: null
}

const allUsersSlice = createSlice({
	name: "allUsers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllUsers.pending, (state) => {
				state.status = "pending"
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
	},
})

export default allUsersSlice.reducer