import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./userDashboard.module.css";

const Dashboard = () => {
  const history = useHistory();

  const handleOptionClick = (option) => {
    alert(`Redirigiendo a ${option}`);
    // history(`/${option.toLowerCase().replace(/\s/g, "-")}`); cuando se agreguen las rutas poner la redireccion hacia ahi
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>Dashboard Cliente - Veterinaria</header>
      <div className={styles.optionsGrid}>
        <div
          className={styles.optionCard}
          onClick={() => handleOptionClick("Atenciones Pendientes de Pago")}
        >
          <div className={styles.icon}>💳</div>
          <p>Atenciones Pendientes de Pago</p>
        </div>

        <div
          className={styles.optionCard}
          onClick={() => handleOptionClick("Historial de Atenciones")}
        >
          <div className={styles.icon}>📜</div>
          <p>Historial de Atenciones</p>
        </div>
      
        <div
          className={styles.optionCard}
          onClick={() => handleOptionClick("Atenciones")}
        >
          <div className={styles.icon}>📋</div>
          <p>Atenciones</p>
        </div>

        <div
          className={styles.optionCard}
          onClick={() => handleOptionClick("Mascotas")}
        >
          <div className={styles.icon}>🐾</div>
          <p>Mascotas</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

