import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLitTexts = createAsyncThunk(
	"litTexts/fetchLitTexts", 
	async () => {
		const response = await fetch("/lit_texts")
		const data = await response.json()
		// console.log("fetchLitTexts", data)
    return data
	})

const litTextsSlice = createSlice({
	name: "litTexts",
	initialState: {
		entities: [],
		status: "idle",
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
				// state.entities.push(action.payload)
				state.entities = action.payload
				state.status = "idle"
			})
	},
})

export const { addCommentToLitText } = litTextsSlice.actions
export default litTextsSlice.reducer
