import React from "react";
import styles from "./pagos-radio.module.css";

const PagosRadio = ({ name, error, register }) => {
  return (
    <div className={`${styles.goodCont}`}>
      <h5 className={`${styles.formLoginLabel}`}>Forma de pago</h5>
      <div className={`d-flex flex-wrap justify-content-evenly form-floating mb-3 `}>
        <div className={`d-flex flex-column ${styles.radioButtonCont} `}>
          <label htmlFor="efectivo" className={` ${styles.radioButtonLabel}`}>
            <div className={`d-flex flex-column align-items-center ${styles.radioButton}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/dinero-en-efectivo.png`}
                alt="efectivo icon"
                className={styles.radioButtonIcon}
              />
              <span className="ms-2">Efectivo</span>
            </div>
          </label>
          <input type="radio" id="efectivo" name="options" value={"Efectivo"}  {...register(name)} />
        </div>
        <div className={`d-flex flex-column ${styles.radioButtonCont} `}>
          <label htmlFor="tarjeta" className={`${styles.radioButtonLabel}`}>
            <div className={`d-flex flex-column align-items-center ${styles.radioButton}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/tarjeta-de-credito.png`}
                alt="tarjeta icon"
                className={styles.radioButtonIcon}
              />
              <span className="ms-2">Debito/Credito</span>
            </div>
          </label>
          <input type="radio" id="tarjeta" name="options" value={"Tarjeta credito/debito"}  {...register(name)}/>
        </div>
        <div className={`d-flex flex-column ${styles.radioButtonCont} `}>
          <label htmlFor="transferencia" className={`${styles.radioButtonLabel}`}>
            <div className={`d-flex flex-column align-items-center ${styles.radioButton}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/transferencia-bancaria.png`}
                alt="transferencia icon"
                className={styles.radioButtonIcon}
              />
              <span className="ms-2">Transferencia</span>
            </div>
          </label>
          <input type="radio" id="transferencia" name="options" value={"Transferencia"}  {...register(name)} />
        </div>
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

export default PagosRadio;
