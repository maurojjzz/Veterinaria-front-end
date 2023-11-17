import React from "react";
import styles from "./layout.module.css";
import Header from "../Header";


const Layout = (props) => {
  return (
    <div className={`container-fluid d-flex flex-column p-0 ${styles.whole_layout_cont}`}>
        <Header />
        {props.children}
    </div>
  );
};

export default Layout;
