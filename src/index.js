import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import store from './app/store';
import { login, logout } from './components/auth/authSlice';
import './styles/styles.scss';
import { firebase } from './components/firebase/firebase';
import LoadingPage from './components/loadingPage/LoadingPage';
import { fetchUsers } from './components/users/usersSlice'
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const App = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(App, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(fetchUsers())
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
