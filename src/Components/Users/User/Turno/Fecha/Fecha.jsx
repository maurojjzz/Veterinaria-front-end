import styles from "./input.module.css";

const Fecha = ({ labelText, placeholder, register, name, error }) => {

  const today = new Date().toISOString().split("T")[0];

  
  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <input
        type={"date"}
        className={!error ? `form-control ${styles.formInput} ` : `form-control is-invalid ${styles.formInput} ${styles.formInputError}`}
        id={`floatingInput-${labelText}`}
        placeholder={placeholder}
        autoComplete="off"
        min={today}
        onFocus={(e) => e.target.showPicker?.()}
        {...register(name, { required: { value: true, message: "Este campo es requerido" } })}
      />
      <label className={!error ? ` ${styles.formLoginLabel} text-info ` : `text-danger`} htmlFor={`floatingInput-${labelText}`}>
        {labelText}
      </label>
      {error ? (
        <div className={`${styles.errorContainer}`}>
          <div className={`text-center  ${styles.errorMensaje}`}>{error}</div> 
        </div>
      ) : (
        <div className={`${styles.spaceErrorMsg}`}></div>
      )}
    </div>
  )
}

export default Fecha;
