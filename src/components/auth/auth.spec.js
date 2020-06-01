import React from 'react';
import { shallow } from 'enzyme';
import Auth from './Auth';
import { firebaseLogin } from './authSlice';
import { login } from './authSlice';
import authReducer from './authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

describe ('Auth component test suite', () => {
  it('should render when component is shallow rendered', () => {
    shallow(<Auth />);
  });
  
  it('should render when component is shallow rendered', () => {
    const wrapper = shallow(<Auth />);
    const dispatchLoginButton = <button className="button" onClick={firebaseLogin()}>Login with Google</button>;
    expect(wrapper.contains(dispatchLoginButton));
  });

  it('should dispatch corresponding uid when user is logging in', () => {
    store.dispatch(login('123'));
    expect(store.getState().auth.value.uid).toEqual('123');
  });
});
