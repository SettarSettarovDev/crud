import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isAuth: false,
    isAdmin: false,
    error: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setIsAuth, setIsAdmin, setError } =
  authSlice.actions;

export default authSlice.reducer;
