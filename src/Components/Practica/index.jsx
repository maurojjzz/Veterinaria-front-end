import { useHistory } from "react-router-dom";
import TablaPracticas from "./Tabla";
import styles from "./practica.module.css";

const Practica = () => {
  const history = useHistory();

  const handlePractica = () => {
    history.push("/admin/practicas/form");
  };

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
        <TablaPracticas />
      </div>
    </div>
  );
};

export default Practica;
