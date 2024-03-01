import React, { useState } from "react";
import styles from "./layout.module.css";
import Header from "../Header";
import MenuHamburguesa from "../MenuHamburguesa/index.jsx";

const Layout = (props) => {
  const [clickHamb, setClickHamb] = useState(false);

  return (
    <div className={`container-fluid d-flex flex-column p-0 ${styles.whole_layout_cont}`}>
        <Header setClickHamb={setClickHamb} clickHamb={clickHamb}/>
        <div>
          {clickHamb && <MenuHamburguesa routes={props.routes}/>}
        </div>          
        {props.children}
    </div>
  );
};

export default Layout;

