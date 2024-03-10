import React from "react";
import styles from "./header.module.css";
import { useHistory } from "react-router-dom";
import LoggedInfo from "../Shared/LoggedInfo";

const Header = ({ setClickHamb, clickHamb }) => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  return (
    <div className={`d-flex justify-content-evenly align-items-center text-light ${styles.headerContainer}`}>
      <div
        onClick={() => {
          setClickHamb(!clickHamb);
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/menu.png`}
          alt={`hamburguer menu icon`}
          className={`d-md-none ${styles.logo}`}
        />
      </div>
      <div
        onClick={() => {
          history.push("/");
        }}
        className={`d-flex gap-2 align-items-center ${styles.logotitle}`}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/pata.png`}
          alt={`dog footprint logo`}
          className={`${styles.logo}`}
        />
        <h1 className={`d-none d-sm-block`}>VeterinariAPP</h1>
      </div>
      {!token ? (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/dog-login.png`}
            alt={`dog entering a door simulating login icon`}
            className={`d-md-none ${styles.logo}`}
            onClick={() => {
              history.push("/auth/login");
            }}
          />
          <div className={`d-none d-md-flex gap-5`}>
            <div
              className={`${styles.linkAccount}`}
              onClick={() => {
                history.push("/auth/login");
              }}
            >
              <h2>Login</h2>
            </div>
            <div
              className={`${styles.linkAccount}`}
              onClick={() => {
                history.push("/auth/sign-up");
              }}
            >
              <h2>Sign Up</h2>
            </div>
          </div>
        </>
      ) : (
        <LoggedInfo />
      )}
    </div>
  );
};

export default Header;
