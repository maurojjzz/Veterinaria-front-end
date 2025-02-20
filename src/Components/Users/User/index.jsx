import { useHistory } from "react-router-dom"
import styles from "./userDashboard.module.css"

const Dashboard = () => {
  const history = useHistory()

  const handleOptionClick = (path) => {
    history.push(path) // Redirige a la ruta correspondiente
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>Dashboard Cliente - Veterinaria</header>
      <div className={styles.optionsGrid}>
        <div className={styles.optionCard} onClick={() => handleOptionClick("/user/atenciones-pendientes")}>
          <div className={styles.icon}>💳</div>
          <p>Atenciones Pendientes de Pago</p>
        </div>

        <div className={styles.optionCard} onClick={() => handleOptionClick("/user/atencion")}>
          <div className={styles.icon}>📋</div>
          <p>Atenciones</p>
        </div>

        <div className={styles.optionCard} onClick={() => handleOptionClick("/user/historial-atenciones")}>
          <div className={styles.icon}>📜</div>
          <p>Historial de Atenciones por Fecha</p>
        </div>

        <div className={styles.optionCard} onClick={() => handleOptionClick("/user/mascotas")}>
          <div className={styles.icon}>🐾</div>
          <p>Mascotas</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


