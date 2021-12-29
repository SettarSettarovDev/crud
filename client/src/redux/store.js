import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import profilesReducers from './profilesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    profiles: profilesReducers,
    auth: authReducer,
  },
});
