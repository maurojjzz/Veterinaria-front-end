import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Components/Layout';
import DasboardUser from '../Components/Users/User/';
import NotAllowed from '../Components/Auth/Not-Allowed'


const UsuarioRoutes = () => {
  const { url } = useRouteMatch()
  
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/dash`} component={DasboardUser} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/dash`} />
      </Switch>
    </Layout>
  );
};

export default UsuarioRoutes;