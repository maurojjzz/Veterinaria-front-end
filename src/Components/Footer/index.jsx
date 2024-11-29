import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={` position-relative  ${styles.footer}`}>
      <div className={styles.footerContent}>
        <p>
          Contáctenos:{" "}
          <a href="mailto:info@veterinaria.com" className={styles.emailLink}>
            info@veterinaria.com
          </a>
        </p>
        <p>Teléfono: +54 3412777607</p>
      </div>
      <div className={styles.footerCredits}>
        <p>
          &copy; {new Date().getFullYear()} Veterinaria Amigos. Todos los derechos reservados. Página web desarrollada
          por Mauro Jimenez y Miguel Rodríguez
        </p>
      </div>
    </footer>
  );
};

export default Footer;
