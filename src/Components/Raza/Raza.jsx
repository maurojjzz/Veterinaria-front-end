import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./raza.module.css";
import { Toast } from "../Shared";
import { getRazas } from "../../redux/razas/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import TablaRaza from "./Tabla/Tabla.jsx";

const Raza = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { razas } = useSelector((state) => state.razas);

  useEffect(() => {
    dispatch(getRazas());
  }, [dispatch]);

  useEffect(() => {
    if (razas) {
      setData(razas);
    }
  }, [razas]);

  const handleRaza = () => {
    history.push("/admin/raza/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/raza", {});
    }
  }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.razaContainer}`}>
      <h1 className={`mb-5 ms-2`}>Raza</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div
          onClick={() => {
            handleRaza();
          }}
          className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}
        >
          <h3>Agregar Raza</h3>
        </div>
        <TablaRaza data={data} setData={setData} />
      </div>

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Raza;
