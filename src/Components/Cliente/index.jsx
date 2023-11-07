import React, { useState, useEffect } from "react";
import styles from './cliente.module.css'
import TablaCliente from "./Table";

const Cliente = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/usuarios`);
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        const usuarios = await data.data.filter((u) => u.rol.descripcion === "Usuario");
        setUsers(usuarios);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <TablaCliente data={users}/>
    </div>
  );
};

export default Cliente;
