import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./mascota.module.css";
import MascotasTable from "./Tabla";
import { Toast } from "../Shared";
import { getMascotas } from "../../redux/mascotas/thunks.js";
import { getEspecie } from "../../redux/especies/thunks.js";
import { useDispatch, useSelector } from "react-redux";

const Mascotas = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { mascotas } = useSelector((state) => state.mascotas);
  const { especies } = useSelector((state) => state.especies);

  useEffect(() => {
    dispatch(getMascotas());
    dispatch(getEspecie());
  }, [dispatch]);

  useEffect(() => {
    if (mascotas) {
      setData(mascotas);
    }
  }, [mascotas]);

  const handleMascota = () => {
    history.push("/admin/mascota/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/mascota", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1`}>
      <h1 className={`mb-5 ms-2`}>Veterinarios</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div
          onClick={() => {
            handleMascota();
          }}
          className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}
        >
          <h3>Agregar Mascota</h3>
        </div>
        <MascotasTable data={data} setData={setData} especies={especies}/>
      </div>

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Mascotas;
