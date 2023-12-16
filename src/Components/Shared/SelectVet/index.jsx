import React, { useEffect, useState } from "react";
import styles from "./select_vet.module.css";

const SelectVet = ({ labelText, placeholder, type, register, name, error, setValue }) => {
  const [veterinario, setVeterinario] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/veterinarios`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        setVeterinario(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = veterinario.filter((usuario) => usuario.email.toLowerCase().trim().includes(value.toLowerCase()));
    setFilteredEmails(filtered);
    console.log(value, "value del handleInputChaange")
  };

  const selectedDue = (ele) => {
    // console.log(ele)
    setInputValue(ele.email);
    setValue(name, ele.id);
    // register(name).setValue(ele.email);
    setFilteredEmails([]);
  };

  // console.log(inputValue)

  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <input
        type={type}
        className={
          !error
            ? `form-control ${styles.formInput} `
            : `form-control is-invalid ${styles.formInput} ${styles.formInputError}`
        }
        id={`floatingInput-${labelText}`}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, { required: { value: true, message: "Este campo es requerido" } })}
        onChange={handleInputChange}
        value={inputValue}
      />
      <label
        className={!error ? ` ${styles.formLoginLabel} text-info ` : `text-danger`}
        htmlFor={`floatingInput-${labelText}`}
      >
        {labelText}
      </label>

      <div className={`p-2 rounded-2 ${styles.usersBox} ${filteredEmails.length === 0 ? `d-none` : `d-block`}`}>
        <div className={`d-flex  flex-column text-center`}>
          {filteredEmails.map((due) => (
            <div
              key={due.id}
              onClick={() => {
                selectedDue(due);
              }}
              className={`d-flex flex-column border mb-2 rounded-3 ${styles.cursor}`}
            >
              <div>{due.email}</div>
              <div>
                {due.nombre} {due.apellido}
              </div>
              <div>
                <span className="fw-bold">Matricula: </span> {due.matricula}
              </div>
            </div>
          ))}
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

export default SelectVet;
