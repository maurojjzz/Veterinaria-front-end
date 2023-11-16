import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import TablaPracticas from "./Tabla";
import styles from "./practica.module.css"

const Practica = () => {
  const [practicas, setPracticas] = useState([]); // Cambié el nombre de la variable para evitar confusiones

  const history = useHistory();

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/practicas`);
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        setPracticas(data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchPracticas();
  }, []);

  const handlePractica = () => {
    history.push('/practica/form');
  };

  return (
  
   <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
   <h1 className={`mb-5 ms-2`}>Practicas</h1>
   <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
     <div onClick={() => { handlePractica() }} className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addPracticaBtn} `}>
       <h3>+ practica</h3>
     </div>
     <TablaPracticas data={practicas} />
   </div>
 </div>
   
  );
};

export default Practica;
