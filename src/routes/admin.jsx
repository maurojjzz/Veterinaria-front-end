import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Components/Layout';
import Cliente from "../Components/Cliente";
import FormClient  from "../Components/Cliente/Form";
import NotAllowed from '../Components/Auth/Not-Allowed';
import Veterinario from "../Components/Veterinario";
import FormVeterinario from "../Components/Veterinario/FormVeterinario";
import Practica from "../Components/Practica";
import FormPractica from "../Components/Practica/Form";
import Atencion from '../Components/Atencion';
import AtencionForm from "../Components/Atencion/Form";


const AdminRoutes = () => {
  const { url } = useRouteMatch();

  const routes = [
    {
      name: 'Usuarios',
      path: '/admin/usuarios',
    },
    {
      name: 'Veterinarios',
      path: '/admin/veterinarios',
    },
    {
      name: 'Practicas',
      path: '/admin/practicas',
    },
    {
      name: 'Atenciones',
      path: '/admin/atenciones',
    }
  ];

  
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/usuarios`} component={Cliente} />
        <Route path={`${url}/usuarios/form/:id?`} component={FormClient} />
        <Route exact path={`${url}/veterinarios`} component={Veterinario} />
        <Route path={`${url}/veterinarios/form/:id?`} component={FormVeterinario} />
        <Route exact path={`${url}/practicas`} component={Practica} />
        <Route path={`${url}/practicas/form/:id?`} component={FormPractica} />
        <Route exact path={`${url}/atenciones`} component={Atencion} />
        <Route path={`${url}/atenciones/form/:id?`} component={AtencionForm} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/usuarios`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
