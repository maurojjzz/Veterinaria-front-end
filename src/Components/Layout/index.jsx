import React, { useState } from "react";
import styles from "./layout.module.css";
import Header from "../Header";
import MenuHamburguesa from "../MenuHamburguesa";
import SideBar from "../SideBar";
import Home from "../Home";
import Footer from "../Footer";

const Layout = (props) => {
  const [clickHamb, setClickHamb] = useState(false);

  return (
    <div className={`container-fluid d-flex flex-column p-0 ${styles.whole_layout_cont}`}>
      <Header setClickHamb={setClickHamb} clickHamb={clickHamb} />
      <div className="d-sm-block d-md-none">{clickHamb && <MenuHamburguesa routes={props.routes} setClickHamb={setClickHamb} />}</div>
      <div className="d-flex flex-grow-1">
        <div className="d-none d-md-block z-1">
          <SideBar routes={props.routes} setClickHamb={setClickHamb}/>
        </div>
        <div className={`position-absolute w-100 h-100 ${styles.contentChild}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
