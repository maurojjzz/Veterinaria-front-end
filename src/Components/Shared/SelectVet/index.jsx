import React, { useEffect, useState } from "react";
import styles from "./select_vet.module.css";
import axios from "../../../axios-config";

const SelectVet = ({ labelText, placeholder, type, register, name, error, setValue, defaultValue }) => {
  const [veterinario, setVeterinario] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/veterinarios`, {
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (response.status === 200) {
          setVeterinario(response.data.data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
      setInputValue(veterinario.find((u) => u.id === defaultValue)?.email || ""); 
      setValue(name, defaultValue);
  }, [defaultValue, name, setValue, veterinario]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = veterinario.filter((usuario) => usuario.email.toLowerCase().trim().includes(value.toLowerCase()));
    setFilteredEmails(filtered);
  };

  const selectedDue = (ele) => {
    setInputValue(ele.id || "");
    setValue(name, ele.id);
    setFilteredEmails([]);
  };


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
