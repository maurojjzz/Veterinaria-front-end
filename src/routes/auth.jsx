import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Components/Layout';
import Home from '../Components/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';

const AuthRoute = () => {
  const { url } = useRouteMatch()
  
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/login`} component={Login} />
        <Route exact path={`${url}/sign-up`} component={SignUp} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
