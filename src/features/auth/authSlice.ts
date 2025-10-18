import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface AuthState {
	isAuthenticated: boolean;
	username: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	username: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.isAuthenticated = true;
			state.username = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.username = null;
		},
	},
});

/**
 * Actions
 */
export const { login, logout } = authSlice.actions;

/**
 * Selectors
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUsername = (state: RootState) => state.auth.username;

/**
 * Reducer
 */
export default authSlice.reducer;
