import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isAuth: false,
    isAdmin: false,
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
  },
});

export const { setCurrentUser, setIsAuth, setIsAdmin } = authSlice.actions;

export default authSlice.reducer;
