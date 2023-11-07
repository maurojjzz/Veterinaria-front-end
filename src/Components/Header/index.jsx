import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={`d-flex justify-content-evenly align-items-center text-light ${styles.headerContainer}`}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/menu.png`}
        alt={`hamburguer menu icon`}
        className={`d-md-none ${styles.logo}`}
      />
      <div className={`d-flex gap-2 align-items-center ${styles.logotitle}`}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/pata.png`}
          alt={`dog footprint logo`}
          className={`${styles.logo}`}
        />
        <h1 className={`d-none d-sm-block`}>VeterinariAPP</h1>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/dog-login.png`}
        alt={`dog entering a door simulating login icon`}
        className={`d-md-none ${styles.logo}`}
      />
      <div className={`d-none d-md-flex gap-5`}>
        <div className={`${styles.linkAccount}`}>
          <h2>Login</h2>
        </div>
        <div className={`${styles.linkAccount}`}>
          <h2>Sign Up</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
