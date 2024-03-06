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
      image: 'home.png',
      alt: 'home icon'    
    },
    {
      name: 'Login',
      path: '/auth/login',
      image: 'enter.png',
      alt: 'login icon'   
    },
    {
      name: 'Sign Up',
      path: '/auth/sign-up',
      image: 'add-user.png',
      alt: 'sign up icon'   
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
