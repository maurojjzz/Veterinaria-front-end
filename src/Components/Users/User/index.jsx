import { DashboardOption } from "../../Shared";
import styles from "./userDashboard.module.css";

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



