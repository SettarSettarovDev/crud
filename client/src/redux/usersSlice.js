import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    fetchAllUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
    },
    editUser(state, action) {
      const userForEditing = state.findIndex(
        item => item.userId === action.payload.userId
      );
      state[userForEditing] = action.payload;
    },
    deleteUser(state, action) {
      const userForDeleting = state.findIndex(
        item => item.userId === action.payload
      );
      state.splice(userForDeleting, 1);
    },
    clearUsers(state, action) {
      return [];
    },
  },
});

export const { addUser, deleteUser, editUser, fetchAllUsers, clearUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
