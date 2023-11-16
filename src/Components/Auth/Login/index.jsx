import React from "react";
import LoginForm from "./Form";
import styles from "./login.module.css";

const Login = () => {
  return (
    <div
      className={`container-fluid d-flex flex-column justify-content-center flex-lg-row justify-content-lg-evenly align-items-lg-center h-100`}
    >
      <div className={`container d-none d-lg-flex border-end border-4 ${styles.containerPic}`}>
        <div className={`flex-grow-1 d-none d-lg-flex justify-content-lg-center align-items-center  col-lg-7`}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Veterinary-rafiki.png`}
            alt={`Foto veterinaria animada`}
            className={`img-fluid ${styles.imagen} border-danger`}
          />
        </div>
      </div>

      <div className={`flex-grow-1 col-lg-5 d-flex justify-content-center align-items-center`}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
