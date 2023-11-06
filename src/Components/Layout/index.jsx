import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect  } from "react-router-dom";
import styles from "./layout.module.css";
import Prueba from "../DePrueba";
import Header from "../Header";
import Home from "../Home";

const Layout = () => {
  return (
    <div className={`container-fluid d-flex flex-column p-0 ${styles.whole_layout_cont}`}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/prueba" component={Prueba} />
          <Route exact path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </div>
  );
};

export default Layout;
