import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLitTextById = createAsyncThunk(
	"showText/fetchLitTextById", 
	async (id) => {
		const response = await fetch(`/api/lit_texts/${id}`)
		const data = await response.json()
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
	reducers: {
		showTextPostComment(state, action) {
			state.entities[0].comments.push(action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLitTextById.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchLitTextById.fulfilled, (state, action) => {
				state.entities.splice(0, 1, action.payload)
				state.status = "idle"
			})
	},
})

export const { showTextPostComment } = showTextSlice.actions
export default showTextSlice.reducer