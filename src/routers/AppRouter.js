import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Dashboard from '../components/dashboard/Dashboard';
import NotFound from '../components/notFound/NotFound';
import Auth from '../components/auth/Auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

function AppRouter() { 
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={Auth} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
};

export default AppRouter;
