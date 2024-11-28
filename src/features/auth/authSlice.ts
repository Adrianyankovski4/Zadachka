import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!sessionStorage.getItem('isAuthenticated'),
  username: sessionStorage.getItem('username') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const { username, password } = action.payload;
      if (username === 'potrebitel' && password === 'password123') {
        state.isAuthenticated = true;
        state.username = username;
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('username', username);
      } else {
        alert('Invalid username or password');
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;