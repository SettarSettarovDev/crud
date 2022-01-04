import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import profilesReducer from './profilesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    profiles: profilesReducer,
    auth: authReducer,
  },
});
