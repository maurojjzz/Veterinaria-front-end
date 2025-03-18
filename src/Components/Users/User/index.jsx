import { Typography } from "@mui/material";
import { DashboardOption } from "../../Shared";
import styles from "./userDashboard.module.css";
import BloqueoMascota from "./Mascota/BloqueoMascota/BloqueoMascota";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
       <header className={styles.header}>
        <Typography variant="h3" mt={-4} mb={5}>Dashboard Cliente</Typography>
      </header>
      <div className={styles.optionsGrid}>
        <DashboardOption icon="👤" text="Perfil" path="/user/perfil" />
        <DashboardOption icon="📜" text="Atenciones" path="/user/historial-atenciones" />
        <DashboardOption icon="📅" text="Turnos" path="/user/turno" />
        <DashboardOption icon="💳" text="Atenciones pendientes" path="/user/atenciones-pendientes" />
        <DashboardOption icon="🐾" text="Mascotas" path="/user/mascotas" />
      </div>
      <BloqueoMascota />
    </div>
  );
};

export default Dashboard;



