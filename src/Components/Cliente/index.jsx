import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./cliente.module.css";
import TablaCliente from "./Table";
import axios from "../../axios-config";

const Cliente = () => {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/usuarios", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          const usuarios = response.data.data.filter((u) => u.rol.descripcion === "Usuario");
          setUsers(usuarios);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUser = () => {
    history.push("/admin/usuarios/form");
  };

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <h1 className={`mb-5 ms-2`}>Usuarios</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div
          onClick={() => {
            handleUser();
          }}
          className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}
        >
          <h3>+ usuario</h3>
        </div>
        <TablaCliente data={users} />
      </div>
    </div>
  );
};

export default Cliente;
