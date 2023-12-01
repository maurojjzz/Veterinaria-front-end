import React, { useEffect, useState } from "react";
import styles from "./select-user.module.css";

const SelectUser = ({ labelText, placeholder, type, register, name, error, setUserPet }) => {
  const [usuarios, setUsuario] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/usuarios`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        const usu = await data.data.filter((u) => u.rol.descripcion === "Usuario");
        setUsuario(usu);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = usuarios.filter((usuario) => usuario.email.toLowerCase().trim().includes(value.toLowerCase()));
    setFilteredEmails(filtered);
  };

  const selectedDue = (ele) => {
    setInputValue(ele.email);
    setUserPet(ele);
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
                <span className="fw-bold">DNI: </span> {due.nro_doc}
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

export default SelectUser;
