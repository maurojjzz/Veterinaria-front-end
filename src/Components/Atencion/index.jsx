import React, {useState, useEffect} from 'react';
import styles from './atencion.module.css'
import { useHistory } from "react-router-dom";
import {decodeToken} from '../../Functions/utiities.js';
import TablaAtencion from './Tabla';


const Atencion = () => {
    const [atens, setAtens] = useState([]);

    const history = useHistory();
  
    useEffect(() => {
      const fetchAte = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_KEY}/atenciones`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            //   Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          const data = await response.json();
          console.log(data.data)
          setAtens(data.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchAte();
    }, []);
  
    const handleUser = () => {
      history.push("/admin/atenciones/form");
    };
  
    return (
      <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
        <h1 className={`mb-5 ms-2`}>Atenciones</h1>
        <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
          <div
            onClick={() => {
              handleUser();
            }}
            className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}
          >
            <h3>+ atencion</h3>
          </div>
          <TablaAtencion data={atens} />
        </div>
      </div>
    );
}

export default Atencion
