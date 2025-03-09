import { useHistory } from "react-router-dom";
import styles from "./userDashboard.module.css";

const DashboardOption = ({ icon, text, path }) => {
  const history = useHistory();

  return (
    <div className={styles.optionCard} onClick={() => history.push(path)}>
      <div className={styles.icon}>{icon}</div>
      <p>{text}</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>Dashboard Cliente - Veterinaria</header>
      <div className={styles.optionsGrid}>
        <DashboardOption icon="💳" text="Atenciones Pendientes de Pago" path="/user/atenciones-pendientes" />
        <DashboardOption icon="📋" text="Atenciones" path="/user/atencion" />
        <DashboardOption icon="📜" text="Historial de Atenciones por Fecha" path="/user/historial-atenciones" />
        <DashboardOption icon="🐾" text="Mascotas" path="/user/mascotas" />
      </div>
    </div>
  );
};

export default Dashboard;



