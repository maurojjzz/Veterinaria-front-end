import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import TablaPracticas from "./Tabla";
import styles from "./practica.module.css"
import axios from "../../axios-config";

const Practica = () => {
  const [practicas, setPracticas] = useState([]); 
  const history = useHistory();

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        const response = await axios.get("/practicas");
        setPracticas(response.data.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchPracticas();
  }, []);

  const handlePractica = () => {
    history.push('/admin/practicas/form');
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/practicas/${id}`);
      if (response.status === 200) {
        const updatedPracticas = practicas.filter((practica) => practica.id !== id);
        setPracticas(updatedPracticas);
        console.log("Eliminada correctamente");
      } else {
        console.log("Error al eliminar practica");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <h1 className={`mb-5 ms-2`}>Practicas</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div onClick={() => { handlePractica() }} className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addPracticaBtn} `}>
          <h3>+ practica</h3>
        </div>
        <TablaPracticas data={practicas} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Practica;
