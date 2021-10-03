import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
	"comments/fetchComments", 
	async () => {
		const response = await fetch("/comments")
		const data = await response.json()
    return data
	}
)

export const postComment = createAsyncThunk(
	"comments/postComment",
	async (formData) => {
		const response = await fetch("/comments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		const data = await response.json()
		console.log("postComment:", data)
    return data
	}	
)

export const patchComment = createAsyncThunk(
	"comments/patchComment",
	async (formData) => {
		const response = await fetch(`/comments/${formData.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		const data = await response.json()
		console.log("patchComment:", data)
    return data
	}
)

export const destroyComment = createAsyncThunk(
	"comments/destroyComment",
	async (id) => {
		fetch(`/comments/${id}`, {
			method: 'DELETE'
		})
		return (id)
	}
)

const initialState = {
	entities: [],
	status: "idle",
	errors: [],
}	

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.errors.push(action.error)
				state.status = "error"
			})
			.addCase(postComment.pending, (state) => {
				state.status = "loading"
			})
			.addCase(postComment.fulfilled, (state, action) => {
				state.entities.push(action.payload)
				state.errors = []
				state.status = "idle"
			})
			.addCase(postComment.rejected, (state, action) => {
				state.errors.push(action.error)
				state.status = "error"
			})
			.addCase(patchComment.pending, (state) => {
				state.status = "loading"
			})
			.addCase(patchComment.fulfilled, (state, action) => {
				const index = state.entities.findIndex((com) => parseInt(com.id) === parseInt(action.payload.id))
				state.entities[index] = action.payload
				state.status = "idle"
			})
			.addCase(patchComment.rejected, (state, action) => {
				state.errors = action.error
				state.status = "error"
			})
			.addCase(destroyComment.pending, (state) => {
				state.status = "loading"
			})
			.addCase(destroyComment.fulfilled, (state, action) => {
				const newArr = state.entities.filter((com) => com.id !== action.payload)
				state.entities = [...newArr]
				state.status = "idle"
			})
			.addCase(destroyComment.rejected, (state, action) => {
				state.errors = action.error
				state.status = "error"
			})
	},
})

export const { logoutUser } = commentsSlice.actions
export default commentsSlice.reducer