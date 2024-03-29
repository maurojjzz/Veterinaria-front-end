import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import styles from "./veterinario.module.css"; 
import TablaVeterinario from "./TablaVeterinario";
import axios from "../../axios-config";

const Veterinario = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchVeterinarios = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/veterinarios`);
        if (response.status === 200) {
          setVeterinarios(response.data.data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVeterinarios();
  }, []);

  const handleVeterinario = () => {
    history.push('/admin/veterinarios/form');
  }

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <h1 className={`mb-5 ms-2`}>Veterinarios</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div onClick={() => { handleVeterinario() }} className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}>
          <h3>Agregar Veterinario</h3>
        </div>
        <TablaVeterinario data={veterinarios} setData={setVeterinarios} />
      </div>
    </div>
  );
};

export default Veterinario;
