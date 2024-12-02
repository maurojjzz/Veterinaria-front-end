import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cliente.module.css";
import TablaCliente from "./Table";
import { initUsers } from "../../redux/users/thunks.js";
import { Toast } from "../Shared";

const Cliente = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { users, pending, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  useEffect(() => {
    if (!pending && error) {
      if (error === "access denied, token expired or incorrect") {
        setToastMessage("Sesion expirada");
      } else {
        setToastMessage(error);
      }
      setToastType("Error");
      setShowToast(true);
    }
  }, [error, pending]);

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/usuarios", {});
    }
  }, [location, history]);

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
          <h3>Agregar Usuario</h3>
        </div>
        <TablaCliente data={data} setData={setData} />
      </div>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Cliente;
