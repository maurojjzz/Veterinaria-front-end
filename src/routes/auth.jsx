import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Components/Layout';
import Home from '../Components/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';

const AuthRoute = () => {
  const { url } = useRouteMatch();

  const routes = [
    {
      name: 'Home',
      path: '/auth/home',
      // icon: 'newhome.svg'
    },
    {
      name: 'Login',
      path: '/auth/login',
      // icon: 'login.svg'
    },
    {
      name: 'Sign Up',
      path: '/auth/sign-up',
      // icon: 'signup.svg'
    }
  ];
  
  
  return (
    <Layout routes={routes}>
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
