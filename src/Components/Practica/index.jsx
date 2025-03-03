import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./practica.module.css";
import { Toast } from "../Shared";
import TablaPracticas from "./Tabla";
import {getPract} from "../../redux/practicas/thunks.js";

const Practica = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { practicas } = useSelector((state) => state.practicas);

  useEffect(() => {
    dispatch(getPract());
  }, [dispatch]);

  useEffect(() => {
    if (practicas) {
      setData(practicas);
    }
  }, [practicas]);

  const handlePractica = () => {
    history.push("/admin/practicas/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/practicas", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <h1 className={`mb-5 ms-2`}>Practicas</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div
          onClick={() => {
            handlePractica();
          }}
          className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addPracticaBtn} `}
        >
          <h3>Agregar Practica</h3>
        </div>
        <TablaPracticas data={data} setData={setData} />
      </div>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Practica;
