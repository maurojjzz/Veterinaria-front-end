import React, { useState, useEffect } from "react";
import {styles} from "./atencionesPendientesPago.module.css";

const AtencionesPendientesPago = () => {
  const [atencionesPendientes, setAtencionesPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAtencionesPendientes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/atenciones-pendientes");
        if (!response.ok) {
          throw new Error("Error al obtener las atenciones pendientes.");
        }
        const data = await response.json();
        setAtencionesPendientes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAtencionesPendientes();
  }, []);

  if (loading) return <p>Cargando atenciones pendientes de pago...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1>Atenciones Pendientes de Pago</h1>
      {atencionesPendientes.length > 0 ? (
        <ul className={styles.list}>
          {atencionesPendientes.map((atencion) => (
            <li key={atencion.id} className={styles.item}>
              <p><strong>Fecha:</strong> {atencion.fecha}</p>
              <p><strong>Mascota:</strong> {atencion.mascota}</p>
              <p><strong>Monto:</strong> {atencion.monto}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay atenciones pendientes de pago.</p>
      )}
    </div>
  );
};

export default AtencionesPendientesPago;
