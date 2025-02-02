import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Components/Layout';
import DasboardUser from '../Components/Users/User';
import NotAllowed from '../Components/Auth/Not-Allowed';
import Atencion from '../Components/Atencion';
import AtencionesPendientesPago from '../Components/Users/User/AtencionesPendientesPago';

const UsuarioRoutes = () => {
  const { url } = useRouteMatch();

  const routes = [
    {
      name: "Home",
      path: "/user/dash",
      image: "home.png",
      alt: "home icon",
    },
    {
      name: "Atenciones",
      path: "/user/atencion",
      image: "order-history.png",
      alt: "atenciones icon",
    },
    {
      name: "Atenciones Pendientes de Pago",
      path: "/user/atenciones-pendientes",
      image: "pending-payment.png",
      alt: "pending payments icon",
    },
  ];


  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/dash`} component={DasboardUser} />
        <Route exact path={`${url}/atencion`} component={Atencion} />
        <Route exact path={`${url}/atenciones-pendientes`} component={AtencionesPendientesPago} />
        <Route exact path={`${url}/atenciones-pendientes`} component={AtencionesPendientesPago} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/dash`} />
      </Switch>
    </Layout>
  );
};

export default UsuarioRoutes;

