import React, { useEffect, useState } from "react";
import styles from "./checkPractices.module.css";
import axios from "../../../axios-config";

const CheckPractices = ({ register, name, error, labelText, placeholder, setValue, defaultValue }) => {
  const [practicas, setPracticas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredPracticas, setFilteredPracticas] = useState([]);
  const [selectedPrac, setSelectedPract] = useState([]);
  const [practicaObj, setPracticaObj] = useState([]);

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await axios.get("/practicas");
        if (response.status === 200) {
          setPracticas(response.data.data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPracticas();
  }, []);

  useEffect(() => {
    setSelectedPract(defaultValue);
    setPracticaObj(practicas.filter((practica) => defaultValue.includes(practica.id)));
  }, [defaultValue, practicas]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = practicas.filter((practica) =>
      practica.descripcion.toLowerCase().trim().includes(value.toLowerCase())
    );
    setFilteredPracticas(filtered);
  };

  const selectedPractica = (ele) => {
    setInputValue(ele.descripcion);
    setFilteredPracticas([]);

    if (!selectedPrac.some((practica) => practica.id === ele.id)) {
      setSelectedPract((prevSelectedPracticas) => [...prevSelectedPracticas, ele.id]);
      setPracticaObj((prevSelectedPracticas) => [...prevSelectedPracticas, ele]);
      setValue(name, [...selectedPrac, ele.id]);
    } else {
      setSelectedPract((prevSelectedPracticas) => prevSelectedPracticas.filter((practica) => practica.id !== ele.id));
      setPracticaObj((prevSelectedPracticas) => prevSelectedPracticas.filter((practica) => practica.id !== ele.id));
      setValue(
        name,
        selectedPrac.filter((practica) => practica.id !== ele.id)
      );
    }
  };

  const handleDelete = (id) => {
    setSelectedPract((prevSelectedPracticas) => prevSelectedPracticas.filter((practica) => practica !== id));
    setPracticaObj((prevSelectedPracticas) => prevSelectedPracticas.filter((practica) => practica.id !== id));
    setValue(
      name,
      selectedPrac.filter((practica) => practica.id !== id)
    );
  };

  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <input type="hidden" {...register(name)} value={JSON.stringify(selectedPrac)} />
      <input
        type={`text`}
        className={
          !error
            ? `form-control ${styles.formInput} `
            : `form-control is-invalid ${styles.formInput} ${styles.formInputError}`
        }
        id={`floatingInput-${labelText}`}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleInputChange}
        value={inputValue}
      />
      <label
        className={!error ? ` ${styles.formLoginLabel} text-info ` : `text-danger`}
        htmlFor={`floatingInput-${labelText}`}
      >
        {labelText}
      </label>

      <div className={`p-2 rounded-2 ${styles.usersBox} ${filteredPracticas.length === 0 ? `d-none` : `d-block`}`}>
        <div className={`d-flex  flex-column text-center`}>
          {filteredPracticas.map((due) => (
            <div
              key={due.id}
              onClick={() => {
                selectedPractica(due);
              }}
              className={`d-flex flex-column border mb-2 rounded-3 ${styles.cursor}`}
            >
              <div>{due.descripcion}</div>
            </div>
          ))}
        </div>
      </div>
      {practicaObj.length > 0 && (
        <div className={`d-flex flex-wrap flex-row p-2 mt-2 border gap-2 ${styles.objetoChose}`}>
          {practicaObj.map((practica, index) => (
            <div className={`d-flex align-items-center rounded-4 p-1 ${styles.elementPractices}`} key={index}>
              {practica.descripcion}
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/cerrar.png`}
                alt="close icon"
                className={`ms-1 ${styles.closeIcon}`}
                onClick={() => handleDelete(practica.id)}
              />
            </div>
          ))}
        </div>
      )}
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

export default CheckPractices;
