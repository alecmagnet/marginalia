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
	reducers: {
		updateUser(state, action) {
			const index = state.entities.findIndex((user) => parseInt(user.id) === parseInt(action.payload.id))
			state.entities[index] = action.payload
			state.status = "idle"
		},	
		addCommentToUser(state, action) {
			const index = state.entities.findIndex((user) => parseInt(user.id) === parseInt(action.payload.user_id))
			const thisUser = state.entities[index]
			thisUser.comments.push(action.payload)
			state.status = "idle"
		},
	},
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

export const { updateUser, addCommentToUser } = allUsersSlice.actions
export default allUsersSlice.reducer