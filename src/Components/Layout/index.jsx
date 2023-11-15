import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styles from "./layout.module.css";
import Prueba from "../DePrueba";
import Header from "../Header";
import Home from "../Home";
import Cliente from "../Cliente";
import FormClient from "../Cliente/Form";
import Practica from "../Practica/";
import FormPractica from "../Practica/Form";

const Layout = () => {
  return (
    <div className={`container-fluid d-flex flex-column p-0 ${styles.whole_layout_cont}`}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/prueba" component={Prueba} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/usuarios" component={Cliente} />
          <Route path="/usuarios/form/:id?" component={FormClient} />
          <Route exact path="/practica" component={Practica} />
          <Route exact path="/practica/form" component={FormPractica} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </div>
  );
};

export default Layout;

