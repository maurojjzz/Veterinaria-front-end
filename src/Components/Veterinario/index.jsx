import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./veterinario.module.css";
import TablaVeterinario from "./TablaVeterinario";
import { Toast } from "../Shared";
import { getVet } from "../../redux/veterinarios/thunks.js";
import { useDispatch, useSelector } from "react-redux";

const Veterinario = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { veterinarios } = useSelector((state) => state.veterinarios);

  useEffect(() => {
    dispatch(getVet());
  }, [dispatch]);

  useEffect(() => {
    if (veterinarios) {
      setData(veterinarios);
    }
  }, [veterinarios]);



  const handleVeterinario = () => {
    history.push("/admin/veterinarios/form");
  };

  useEffect(() => {
    if (location.state?.state?.message) {
      setToastMessage(location.state?.state?.message);
      setToastType(location.state?.state.type);
      setShowToast(true);
      history.replace("/admin/veterinarios", {});
    }
  }, [location, history]);


  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <h1 className={`mb-5 ms-2`}>Veterinarios</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div
          onClick={() => {
            handleVeterinario();
          }}
          className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}
        >
          <h3>Agregar Veterinario</h3>
        </div>
        <TablaVeterinario data={data} setData={setData} />
      </div>

      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Veterinario;
