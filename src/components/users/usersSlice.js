import { firebase, googleAuthProvider } from '../firebase/firebase';
import { createSlice } from '@reduxjs/toolkit';
import { client } from './../app.js'
import { gql } from 'apollo-boost';

export function fetchUsers() {
  return async (dispatch) => {
    const usersQuery = gql`
      query {
        users {
          name
          age
          hobbies
        }
      }
    ` 
    const res = await client.query({
      query: usersQuery
    })

    dispatch(setUsers(res.data.users));
  }
}

function setUsers(_, users) {
  return users;
}

export function startAddUser(_, { name, age, hobbies }) {
  return async (dispatch) => {
    const userMutation = gql`
      mutation createUser ($name: String!, $age: Int!, $hobbies: [String!]!){
        createUser(name: $name, age: $age, hobbies: $hobbies) {
          name
          age
          hobbies
        }
      }
    ` 
    const res = await client.mutate({
      mutation: userMutation,
      variables: { name, age, hobbies }
    })

    const  { name, age, hobbies} = res.data.createUser; 
    dispatch(addUser({ name, age, hobbies }));
  }
}

function addUser(state, user) {
  return [ ...state.users, user ];
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    fetchUsers,
    setUsers,
    startAddUser
  }
});

export const { 
    logfetchUsersin, 
    setUsers, 
    startAddUser 
} = usersSlice.actions;

export const selectUsers = state => state.users;

export default usersSlice.reducer;
