import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './components/store/configureStore';
import { login, logout } from './components/auth/authSlice';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { fetchUsers } from './actions/users'
import ApolloClient from 'apollo-boost';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const store = configureStore();
const jsx = (
  <React.StrictMode>
    <MuiThemeProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
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
