import React from "react";
import styles from './user-box.module.css'

const BoxVet = ({ nombre, apellido }) => {
  

  return (
    <div className={`p-2 rounded-5 ${styles.container}`}>
      <div className={`fs-1 fw-medium text-light`}>{`${nombre[0]}${apellido[0]}`}</div>
    </div>
  );
};

export default BoxVet;
