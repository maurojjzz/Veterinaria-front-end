import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./home.module.css";
import Footer from "../Footer";

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <div id="hero" className={`position-relative ${styles.heroSection}`}>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Veterinary-bro.png`}
            alt={`Veterinario atendiendo a un perrito`}
            className={`img-fluid ${styles.heroImage} border-danger`}
          />
        </div>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Cuidamos a tus mascotas como parte de nuestra familia</h2>
          <p className={styles.heroText}>Servicios veterinarios de calidad con atención personalizada.</p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary} onClick={() => history.push("/user/dash")}>
              Ver Servicios
            </button>
            <button className={styles.btnSecondary}>Agendar Cita</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
