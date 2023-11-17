import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Components/Layout';
import Cliente from "../Components/Cliente";
import FormClient  from "../Components/Cliente/Form";
import NotAllowed from '../Components/Auth/Not-Allowed'


const AdminRoutes = () => {
  const { url } = useRouteMatch()
  
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/usuarios`} component={Cliente} />
        <Route path={`${url}/usuarios/form/:id?`} component={FormClient} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/usuarios`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
