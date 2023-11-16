import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styles from "./layout.module.css";
import Prueba from "../DePrueba";
import Header from "../Header";
import Home from "../Home";
import Cliente from "../Cliente";
import FormClient from "../Cliente/Form";
import FormVeterinario from "../Veterinario/FormVeterinario"
import Veterinario from "../Veterinario"
import Practica from "../Practica"
import FormPractica from "../Practica/Form";

const Layout = () => {
  return (
    <div className={`container-fluid d-flex flex-column p-0 ${styles.whole_layout_cont}`}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/prueba" component={Prueba} />
          <Route exact path="/home" component={Home} />
          <Route path="/usuarios/form/:id?" component={FormClient} />
          <Route path="/usuarios" component={Cliente} />
          <Route path="/veterinarios/form/:id?" component={FormVeterinario} />
          <Route path="/veterinarios" component={Veterinario} />
          <Route exact path="/practica" component={Practica} />
          <Route exact path="/practica/form/:id?" component={FormPractica} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </div>
  );
};

export default Layout;

