import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Layout from "../Components/Layout";
import Dashboard from "../Components/Users/Veterinario/Dashboard.jsx";
import NotAllowed from "../Components/Auth/Not-Allowed";


const VeterinarioRoutes = () => {
  const { url } = useRouteMatch();

  const routes = [
    {
      name: "Home",
      path: "/vet/dash",
      image: "home.png",
      alt: "home icon",
    },
  ];

  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/dash`} component={Dashboard} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/dash`} />
      </Switch>
    </Layout>
  );
};

export default VeterinarioRoutes;
