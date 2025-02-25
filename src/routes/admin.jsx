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
import Pets from "../Components/Mascotas"
import PetsForm from "../Components/Mascotas/Form"
import Especies from '../Components/Especie';
import EspeciesForm from '../Components/Especie/Form';

const AdminRoutes = () => {
  const { url } = useRouteMatch();

  const routes = [
    {
      name: 'Usuarios',
      path: '/admin/usuarios',
      image: 'group.png',
      alt: 'users icon'
    },
    {
      name: 'Veterinarios',
      path: '/admin/veterinarios',
      image: 'veterinary.png',
      alt: 'icono de veterinario'
    },
    {
      name: 'Practicas',
      path: '/admin/practicas',
      image: 'practica2.png',
      alt: 'icono de practicas'
    },
    {
      name: 'Atenciones',
      path: '/admin/atenciones',
      image: 'order-history.png',
      alt: 'icono de historial de atenciones'
    },
    {
      name: "Mascotas",
      path: "/admin/mascota",
      image: "Mascota.png",
      alt: "icono de mascotas",
    },{
    name: "Especies",
      path: "/admin/especie",
      image: "Especie.png",
      alt: "icono de especie",
},];

  
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
        <Route exact path={`${url}/mascota`} component={Pets} />
        <Route path={`${url}/mascota/form/:id?`} component={PetsForm} />
        <Route exact path={`${url}/especie`} component={Especies} />
        <Route path={`${url}/especie/form/:id?`} component={EspeciesForm} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/usuarios`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
