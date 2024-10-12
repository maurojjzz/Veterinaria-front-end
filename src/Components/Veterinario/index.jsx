import { useHistory } from "react-router-dom";
import styles from "./veterinario.module.css";
import TablaVeterinario from "./TablaVeterinario";

const Veterinario = () => {

  const history = useHistory();

  const handleVeterinario = () => {
    history.push("/admin/veterinarios/form");
  };

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
        <TablaVeterinario />
      </div>
    </div>
  );
};

export default Veterinario;
