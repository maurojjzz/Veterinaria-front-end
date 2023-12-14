import React, { useEffect, useState } from "react";
import styles from "./checkPractices.module.css";

const CheckPractices = ({ register, name, error, labelText, placeholder }) => {
  const [practicas, setPracticas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredPracticas, setFilteredPracticas] = useState([]);
  const [selectedPrac, setSelectedPract] = useState([]);

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/practicas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        setPracticas(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPracticas();
  }, []);

  

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
    } else {
      setSelectedPract((prevSelectedPracticas) => prevSelectedPracticas.filter((practica) => practica.id !== ele.id));
    }
  };

  console.log(selectedPrac);

  return (
    <div className={`d-flex flex-column form-floating mb-3 ${styles.goodCont}`}>
      <input type="hidden" {...register(name)} value={selectedPrac} />
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
      <div>
        {selectedPrac.map((practica,index) => (
          <span key={index}>{practica.descripcion}</span>
        ))}
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

export default CheckPractices;
