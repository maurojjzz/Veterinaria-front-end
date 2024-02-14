import React from "react";
import styles from "./button-submit.module.css";

const Button = ({ type, msg, clickAction }) => {
  const handleClick = () => {
    if (clickAction) {
      clickAction();
    }
  };

  return (
    <div className={` ${styles.containerButton}`}>
      <button type={type} onClick={handleClick} className={` ${styles.buttonStyle}`} >
        {msg}
      </button>
    </div>
  );
};

export default Button;
