import React, { Suspense } from 'react';
import {
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "auth-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "auth-register" */ './register')
);
const Auth = ({ match }) => {
    return (
        <div className="container blog-container pt-5-3">
            <Suspense fallback={<div>Loading ...</div>}>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
                    <Route
                        path={`${match.url}/login`}
                        render={props => <Login {...props} />}
                    />
                    <Route
                        path={`${match.url}/register`}
                        render={props => <Register {...props} />}
                    />
                    <Redirect to="/error" />
                </Switch>
            </Suspense>
        </div>
    );
}

export default Auth;