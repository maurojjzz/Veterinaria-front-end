import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Layout from "../Components/Layout";
import DasboardUser from "../Components/Users/User";
import NotAllowed from "../Components/Auth/Not-Allowed";
import HistorialAtenciones from "../Components/Users/User/HistorialAtenciones";
import Perfil from "../Components/Users/User/Perfil/Perfil";
import Mascotas from "../Components/Users/User/Mascota/Mascota";
import MascotasForm from "../Components/Users/User/Mascota/Form";
import Turno from "../Components/Users/User/Turno/Turno";

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
      name: "Turno",
      path: "/user/turno",
      image: "order-history.png",
      alt: "turno icon",
    },
    {
      name: "Atenciones",
      path: "/user/historial-atenciones",
      image: "practica2.png",
      alt: "history icon",
    },
    {
      name: "Mascotas",
      path: "/user/mascotas",
      image: "canino.png",
      alt: "pets icon",
    },
    {
      name: "Perfil",
      path: "/user/perfil",
      image: "user.png",
      alt: "Perfil icon",
    },
  ];

  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/dash`} component={DasboardUser} />
        <Route exact path={`${url}/historial-atenciones`} component={HistorialAtenciones} />
        <Route exact path={`${url}/mascotas`} component={Mascotas} />
        <Route path={`${url}/mascotas/form/:id?`} component={MascotasForm} />
        <Route exact path={`${url}/perfil`} component={Perfil} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Route exact path={`${url}/turno`} component={Turno} />
        <Redirect to={`${url}/dash`} />
      </Switch>
    </Layout>
  );
};

export default UsuarioRoutes;
