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
	reducers: {},
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

export default litTextsSlice.reducer
