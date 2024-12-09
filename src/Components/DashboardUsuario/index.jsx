import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    alert(`Redirigiendo a ${option}`);
    navigate(`/${option.toLowerCase().replace(/\s/g, "-")}`);
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

