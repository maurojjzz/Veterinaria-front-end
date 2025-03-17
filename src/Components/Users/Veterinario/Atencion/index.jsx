import styles from "./atencion.module.css";
import { useHistory, useLocation } from "react-router-dom";
import TablaAtencion from "./Tabla";
import { useEffect, useState } from "react";
import { Toast} from "../../../Shared"

const Atencion = () => {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");


  const history = useHistory();

  const location = useLocation();

  const handleAtencion = () => {
    history.push("/vet/atenciones/form");
  };

   useEffect(() => {
      if (location.state?.state?.message) {
        setToastMessage(location.state?.state?.message);
        setToastType(location.state?.state.type);
        setShowToast(true);
        history.replace("/admin/atenciones", {});
      }
    }, [location, history]);

  return (
    <div className={`d-flex flex-column justify-content-center flex-grow-1 ${styles.clienteContainer}`}>
      <h1 className={`mb-5 ms-2`}>Atenciones</h1>
      <div className={`container-xl d-flex flex-column ${styles.tableContainer} `}>
        <div
          onClick={() => {
            handleAtencion();
          }}
          className={` align-self-end me-3 me-md-4 mb-2 rounded px-1 ${styles.addUserBtn} `}
        >
          <h3>Agregar Atencion</h3>
        </div>
        <TablaAtencion />
      </div>
      {showToast && <Toast title={toastType} message={toastMessage} setError={setShowToast} />}
    </div>
  );
};

export default Atencion;
