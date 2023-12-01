import React from "react";
import styles from "./select-pet.module.css";

const SelectPet = ({ mascotas, error, register , name}) => {
  return (
    <div className={`d-flex flex-column mb-3 ${styles.goodCont}`}>
      <div className={`form-floating `}>
        <select
          className={!error ? `form-select ${styles.selectInput} ` : `form-select is-invalid ${styles.selectInput} ${styles.selectInputError}`}
          id="floatingSelect"
          aria-label="Floating label select example"
          {...register(name, { required: { value: true, message: "Este campo es requerido" } })}        >
          <option disabled defaultValue>
            Selecciona una mascota
          </option>
          {mascotas?.length > 0 ? (
            mascotas?.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.nombre}
              </option>
            ))
          ) : (
            <option disabled>Cliente sin mascotas registradas</option>
          )}
        </select>
        <label className={`${styles.formLoginLabel}`} htmlFor="floatingSelect">
          Mascota
        </label>
      </div>
      {error ? (
        <div className={`${styles.errorContainer}`}>
          <div className={`text-center  ${styles.errorMensaje}`}>{error}</div>
        </div>
      ) : (
        <div className={`${styles.spaceErrorMsg}`}></div>
      )}
    </div>
  );
};

export default SelectPet;
