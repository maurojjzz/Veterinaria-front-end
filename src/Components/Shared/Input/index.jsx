import React from "react";
import styles from "./input.module.css";

const Input = ({ labelText, placeholder, type, register, name }) => {
  return (
    <div className={`form-floating mb-3  ${styles.goodCont}`}>
      <input
        type={type}
        className={`form-control ${styles.formInput} `}
        id={`floatingInput-${labelText}`}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, { required: { value: true, message: "Este campo es requerido" } })}
      />
      <label className={` ${styles.formLoginLabel} `} htmlFor={`floatingInput-${labelText}`}>
        {labelText}
      </label>
    </div>
  );
};

export default Input;
