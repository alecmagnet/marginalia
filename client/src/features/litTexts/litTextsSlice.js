import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLitTexts = createAsyncThunk(
	"litTexts/fetchLitTexts", 
	async () => {
		const response = await fetch("/lit_texts")
		const data = await response.json()
    return data
	}
)

export const postLitText = createAsyncThunk(
	"litTexts/postLitText",
	async (formData) => {
		try {
			const response = await fetch("/lit_texts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
			return await response.json()
		}	catch (err) {
			console.log("err", err, "err.response.data", err.response.data)
		}
	}
)

export const patchLitText = createAsyncThunk(
	"litTexts/patchLitText",
	async (formData) => {
		try {
			const response = await fetch(`/lit_texts/${formData.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
			return await response.json()
		}	catch (err) {
			console.log("err", err, "err.response.data", err.response.data)
		}
	}
)

const litTextsSlice = createSlice({
	name: "litTexts",
	initialState: {
		entities: [],
		status: "idle",
		errors: [],
	},
	reducers: {
		addCommentToLitText(state, action) {
			const index = state.entities.findIndex((text) => parseInt(text.id) === parseInt(action.payload.lit_text_id))
			const thisText = state.entities[index]
			console.log("addCommentToLitText index", thisText)
			console.log("addCommentToLitText comments", thisText.comments)
			thisText.comments.push(action.payload)
			state.status = "idle"
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLitTexts.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchLitTexts.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
			.addCase(postLitText.pending, (state) => {
				state.status = "pending"
			})
			.addCase(postLitText.fulfilled, (state, action) => {
				state.entities.push(action.payload)
				state.errors = []
				state.status = "idle"
			})
			.addCase(postLitText.rejected, (state, action) => {
				state.errors.push(action.error)
				state.status = "error"
			})
			.addCase(patchLitText.pending, (state) => {
				state.status = "pending"
			})
			.addCase(patchLitText.fulfilled, (state, action) => {
				const index = state.entities.findIndex((text) => parseInt(text.id) === parseInt(action.payload.id))
				state.entities[index] = action.payload
				state.errors = []
				state.status = "idle"
			})
			.addCase(patchLitText.rejected, (state, action) => {
				state.errors.push(action.error)
				state.status = "error"
			})
	},
})

export const { addCommentToLitText } = litTextsSlice.actions
export default litTextsSlice.reducer