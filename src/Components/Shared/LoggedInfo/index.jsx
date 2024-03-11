import React, { useEffect, useState } from "react";
import styles from "./loggedInfo.module.css";
import { decodeToken } from "../../../Functions/utiities.js";
import { useHistory } from "react-router-dom";


const LoggedInfo = () => {
  const [idLoged, setIdLoged] = useState("");
  const [vocals, setVocals] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setIdLoged(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const user = async () => {
      if (idLoged) {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/usuarios/${idLoged}`);
        const data = await response.json();
        setVocals(`${data.data.nombre[0]}${data.data.apellido[0]}`);
        setUser(data.data);
      }
    };
    user();
  }, [idLoged]);

  const redirections = () => {
    switch (user.rol.descripcion) {
      case "Admin": {
        history.push("/admin");
        break;
      }
      case "Usuario": {
        history.push("/user");
        break;

      }
      default: {
        history.push("/");
        break;
      }
    }
  }

  return (
    <div className={`d-flex flex-row gap-sm-1 pe-sm-2 gap-3 p-1 rounded-4 bg-light ${styles.containerInfo}`} onClick={() => redirections()} >
      <div className={`d-flex justify-content-center align-items-center rounded-5 text-light ${styles.circle}`}>
        {vocals}
      </div>
      <div className={`d-none d-sm-flex flex-column ${styles.info}`}>
        <div>
          <div>{user.nombre} {user.apellido}</div>
        </div>
        <div>
          <div>{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInfo;
