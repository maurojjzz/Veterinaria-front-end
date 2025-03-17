import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Layout from "../Components/Layout";
import Dashboard from "../Components/Users/Veterinario/Dashboard.jsx";
import NotAllowed from "../Components/Auth/Not-Allowed";
import Atencion from "../Components/Users/Veterinario/Atencion";
import AtencionForm from "../Components/Users/Veterinario/Atencion/Form";
import Perfil from "../Components/Users/Veterinario/Perfil/Perfil"; 

const VeterinarioRoutes = () => {
  const { url } = useRouteMatch();

  const routes = [
    {
      name: "Home",
      path: "/vet/dash",
      image: "home.png",
      alt: "home icon",
    },
    {
      name: "Atenciones",
      path: "/vet/atenciones",
      image: "order-history.png",
      alt: "home icon",
    },
    {
      name: "Perfil",
      path: "/vet/perfil",
      image: "user.png",
      alt: "Perfil icon",
    },
  ];

  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/dash`} component={Dashboard} />
        <Route exact path={`${url}/atenciones`} component={Atencion} />
        <Route path={`${url}/atenciones/form/:id?`} component={AtencionForm} />
        <Route exact path={`${url}/perfil`} component={Perfil} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/dash`} />
      </Switch>
    </Layout>
  );
};

export default VeterinarioRoutes;
