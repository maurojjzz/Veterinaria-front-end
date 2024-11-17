import React from 'react';
import styles from './home.module.css';

const Home = () => {
  return (
    <section id="hero" className="hero">
      <div className="container hero-content">
        <h1>Cuidamos a tus mascotas como parte de nuestra familia</h1>
        <p>Servicios veterinarios de calidad con atención personalizada.</p>
        <div className="hero-buttons">
          <button className="btn-primary">Ver Servicios</button> 
          <button className="btn-secondary">Agendar Cita</button> {/*dejo los botones hechos para el futuro, cuando tengamos estas secciones terminadas pongo los link*/}
        </div>
      </div>
    </section>
  );
};

export default Home;

