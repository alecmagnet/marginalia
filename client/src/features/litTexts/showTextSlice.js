import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLitTextById = createAsyncThunk(
	"litTexts/fetchLitTextById", 
	async (id) => {
		const response = await fetch(`/lit_texts/${id}`)
		const data = await response.json()
		console.log(data)
    return data
	})

const showTextSlice = createSlice({
	name: "showText",
	initialState: {
		entities: [],
		status: "idle",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLitTextById.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchLitTextById.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
	},
})

export default showTextSlice.reducer