import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLitTextById = createAsyncThunk(
	"showText/fetchLitTextById", 
	async (id) => {
		const response = await fetch(`/lit_texts/${id}`)
		const data = await response.json()
		// console.log(data)
    return data
	})

const initialState = {
	entities: [],
	status: "idle",
	errors: [],
}	

const showTextSlice = createSlice({
	name: "showText",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLitTextById.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchLitTextById.fulfilled, (state, action) => {
				state.entities.splice(0, 1, action.payload)
				console.log("fetchLitTextById", state.entities)
				state.status = "idle"
			})
	},
})

export default showTextSlice.reducer