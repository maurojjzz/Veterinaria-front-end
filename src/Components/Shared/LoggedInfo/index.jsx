import React, { useEffect, useState } from "react";
import styles from "./loggedInfo.module.css";
import { decodeToken } from "../../../Functions/utiities.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById } from "../../../redux/users/thunks.js";
import { getVetById } from "../../../redux/veterinarios/thunks.js";

const LoggedInfo = () => {
  const [idLoged, setIdLoged] = useState("");
  const [vocals, setVocals] = useState("");
  const [user, setUser] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setIdLoged(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      let usuarioLogueado = undefined;
      try {
        usuarioLogueado = await dispatch(getUserById(idLoged));
        if (!usuarioLogueado) {
          usuarioLogueado = await dispatch(getVetById(idLoged));
        }
        setUser(usuarioLogueado);
      } catch (error) {
        console.log(error);
      }
    };

    if (idLoged) {
      fetchUser();
    }
  }, [dispatch, idLoged]);

  useEffect(() => {
    if (user.id) {
      setVocals(`${user?.nombre[0]}${user?.apellido[0]}`);
    }
  }, [user]);

  const redirections = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "Admin": {
        history.push("/admin");
        break;
      }
      case "Usuario": {
        history.push("/user");
        break;
      }
      case "Veterinario": {
        history.push("/vet");
        break;
      }
      default: {
        history.push("/");
        break;
      }
    }
  };

  return (
    <div
      className={`d-flex flex-row gap-sm-1 pe-sm-2 gap-3 p-1 rounded-4 bg-light ${styles.containerInfo}`}
      onClick={() => redirections()}
    >
      <div className={`d-flex justify-content-center align-items-center rounded-5 text-light ${styles.circle}`}>
        {vocals}
      </div>
      <div className={`d-none d-sm-flex flex-column ${styles.info}`}>
        <div>
          <div>
            {user?.nombre} {user?.apellido}
          </div>
        </div>
        <div>
          <div>{user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInfo;
