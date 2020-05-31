import { createSlice } from '@reduxjs/toolkit';
import { client } from './../../index.js'
import { gql } from 'apollo-boost';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setUsers: (state, action) => {
      state.value = action.payload
    }
  }
});

const { addUser, setUsers } = usersSlice.actions;


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

    console.log(res.data.users)
    dispatch(setUsers(res.data.users));
  }
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

    return dispatch(addUser({
      name: res.data.createUser.name, 
      age: res.data.createUser.age, 
      hobbies: res.data.createUser.hobbies       
    }));
  }
}

export const selectUsers = state => state.users.value;

export default usersSlice.reducer;
