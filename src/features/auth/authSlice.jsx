import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		value: false,
	},
	reducers: {
		login: (state, action) => {
			state.value = {
				email: action.payload.email,
				uid: action.payload.uid
			}
		},
		logout: state => {
			state.value = false
		}
	}
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer