import React from "react";
import styles from "./button-submit.module.css";

const ButtonSubmit = ({ type, msg, clickAction }) => {
  return (
    <div className={` ${styles.containerButton}`}>
      <button type={type} onClick={clickAction} className={` ${styles.buttonStyle}`} >
        {msg}
      </button>
    </div>
  );
};

export default ButtonSubmit;
