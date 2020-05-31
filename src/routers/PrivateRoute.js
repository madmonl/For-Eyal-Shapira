import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/header/Header';
import { selectAuth } from '../components/auth/authSlice';

export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(selectAuth);

  return (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );
} 
