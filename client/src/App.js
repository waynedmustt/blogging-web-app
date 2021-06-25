import React, { Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { coreService } from './core/service';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "view-app" */ './screens/app')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "view-error" */ './screens/error')
);
const ViewAuth = React.lazy(() =>
  import(/* webpackChunkName: "view-auth" */ './screens/auth')
);

const App = () => {
  const AuthRoute = ({ component: Component, authUser, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          authUser ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: '/auth/login',
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
  }

  const isLoggedIn = coreService.getItem('isLoggedIn')

  return (
      <React.Fragment>
          <Suspense fallback={<div>Loading ...</div>}>
            <Router>
              <Switch>
                <AuthRoute
                  path="/app"
                  authUser={isLoggedIn}
                  component={ViewApp}
                />
                <Route
                  path="/app"
                  render={props => <ViewApp {...props} />}
                />
                <Route
                  path="/auth"
                  render={props => <ViewAuth {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={props => <ViewError {...props} />}
                />
                <Route
                  path="/"
                  exact // eslint-disable-next-line
                  render={props => <Redirect to="/app" />}
                />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
      </React.Fragment>
  );
}

export default App;