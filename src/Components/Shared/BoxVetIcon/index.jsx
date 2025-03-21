import React from "react";
import styles from "./user-box.module.css";

const BoxVet = ({ nombre, apellido }) => {
  const initialName = (nombre && nombre[0]) || "";
  const initialSurname = (apellido && apellido[0]) || "";

  return (
    <div className={`p-2 rounded-5 ${styles.container}`}>
      <div className={`fs-1 fw-medium text-light`}>{`${initialName}${initialSurname}`}</div>
    </div>
  );
};

export default BoxVet;
