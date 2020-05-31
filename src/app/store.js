import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/auth/authSlice';
import usersReducer from '../components/users/usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer, 
    users: usersReducer
  }
});
