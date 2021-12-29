import { createSlice } from '@reduxjs/toolkit';

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: [],
  reducers: {
    fetchAllProfiles(state, action) {
      return action.payload;
    },
    addProfile(state, action) {
      state.push(action.payload);
    },
    editProfile(state, action) {
      const profileForEditing = state.findIndex(
        item => item.profileId === action.payload.profileId
      );
      state.splice(profileForEditing, 1, action.payload);
    },
    deleteProfile(state, action) {
      const profileForDeleting = state.findIndex(
        item => item.profileId === action.payload
      );
      state.splice(profileForDeleting, 1);
    },
  },
});

export const { addProfile, fetchAllProfiles, deleteProfile, editProfile } =
  profilesSlice.actions;

export default profilesSlice.reducer;
