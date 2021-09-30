import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLitTexts = createAsyncThunk("litTexts/fetchLitTexts", () => {
	return fetch("/lit_texts")
    .then((r) => r.json())
    .then((data) => data.sort((a, b) => b.id - a.id))
})

const litTextsSlice = createSlice({
	name: "litTexts",
	initialState: {
		entities: [],
		status: "idle",
	},
	reducers: {},
	extraReducers: {
		[fetchLitTexts.pending](state) {
			state.status = "loading"
		},
		[fetchLitTexts.fulfilled](state, action) {
			state.entities = action.payload
			state.status = "idle"
		}
	},
})

export default litTextsSlice.reducer