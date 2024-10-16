import styles from "./atencion.module.css";
import { useHistory } from "react-router-dom";
import TablaAtencion from "./Tabla";

const Atencion = () => {
  const history = useHistory();

  const handleAtencion = () => {
    history.push("/admin/atenciones/form");
  };

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
    </div>
  );
};

export default Atencion;
