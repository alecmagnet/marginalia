import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authorize = createAsyncThunk(
	"user/authorize",
	async () => {
		const response = await fetch("/auth")
		const data = await response.json()
    return data
	}
)

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (formData) => {
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		// const data = await response.json()
		// console.log("loginUser:", data)
    return response.data
	}	
)

export const logoutUser = createAsyncThunk(
	"user/logoutUser", 
	async () => {
		fetch("/logout", {
      method: "DELETE",
    })
	}
)

export const signupUser = createAsyncThunk(
	"user/signupUser",
	async (formData) => {
		const response = await fetch("/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		const data = await response.json()
		console.log("signupUser:", data)
    return data
	})

const initialState = {
	entities: [],
	status: "idle",
	errors: [],
}	

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addLoginUser(state, action) {
			state.entities.splice(0, 1, action.payload)
			state.errors = []
			state.status = "idle"
		},
		addSignupUser(state, action) {
			state.entities.splice(0, 1, action.payload)
			state.errors = []
			state.status = "idle"
		},
		updateCurrentUser(state, action) {
			state.entities.splice(0, 1, action.payload)
			state.errors = []
			state.status = "idle"
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authorize.pending, (state) => {
				state.status = "loading"
			})
			.addCase(authorize.fulfilled, (state, action) => {
				state.entities.splice(0, 1, action.payload)
				state.errors = []
				state.status = "idle"
			})
			.addCase(authorize.rejected, (state, action) => {
				state.errors.push(action.error)
				state.status = "error"
			})
			.addCase(loginUser.pending, (state) => {
				state.status = "loading"
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.entities.splice(0, 1, action.payload)
				state.errors = []
				state.status = "idle"
				console.log("loginUser FULFILLED")
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.errors = action.error.message
				state.entities = []
				state.status = "error"
			})
			.addCase(logoutUser.pending, (state) => {
				state.status = "loading"
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.entities = []
				state.errors = []
				state.status = "idle"
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.errors = action.error
				state.status = "error"
			})
			.addCase(signupUser.pending, (state) => {
				state.status = "loading"
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.errors = action.error
				state.status = "error"
			})
	},
})

export const { addLoginUser, addSignupUser, updateCurrentUser } = userSlice.actions
export default userSlice.reducer