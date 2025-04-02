import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Footer from "../Footer";
import { decodeToken } from "../../Functions/utiities.js";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setRole(decodedToken.role);
    }
  }, []);

  const handleViewServices = () => {
    switch (role) {
      case "Admin":
        history.push("/admin");
        break;
      case "Veterinario":
        history.push("/vet");
        break;
      case "Usuario":
        history.push("/user");
        break;
      default:
        history.push("/auth/login");
        break;
    }
  };

  const handleManageAppointments = () => {
    switch (role) {
      case "Admin":
        history.push("/admin");
        break;
      case "Veterinario":
        history.push("/vet");
        break;
      case "Usuario":
        history.push("/user/turno");
        break;
      default:
        history.push("/auth/login");
        break;
    }
  };

  return (
    <div>
      <div id="hero" className={`position-relative ${styles.heroSection}`}>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Veterinary-bro.png`}
            alt="Veterinario atendiendo a un perrito"
            className={`img-fluid ${styles.heroImage}`}
          />
        </div>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Cuidamos a tus mascotas como parte de nuestra familia
          </h2>
          <p className={styles.heroText}>
            Servicios veterinarios de calidad con atención personalizada.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary} onClick={handleViewServices}>
              Ver Servicios
            </button>
            <button className={styles.btnSecondary} onClick={handleManageAppointments}>
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

