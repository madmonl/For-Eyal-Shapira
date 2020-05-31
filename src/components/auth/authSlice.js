import { firebase, googleAuthProvider } from '../firebase/firebase';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {},
  },
  reducers: {
      login: (_, uid) => ({ uid }),
      firebaseLogin: () => {
        return () => {
            return firebase.auth().signInWithPopup(googleAuthProvider);          
        }
      },
      logout: () => ({}),
      firebaseLogout: () => {
        return () => {
            return firebase.auth().signOut();
          }
      }
    }
});

export const { 
    login, 
    firebaseLogin, 
    logout, 
    firebaseLogout 
} = authSlice.actions;

export const selectAuth = state => !!state.auth.uid;

export default authSlice.reducer;
