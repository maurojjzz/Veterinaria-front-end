import React from "react";
import styles from "./pagoDetalle.module.css";

const PagoDetalle = ({ pago, onClose }) => {
  if (!pago) return null;

  return (
    <div className={styles.detalleContainer}>
      <div className={styles.detalleCard}>
        <h3>Detalle del Pago</h3>
        <p><strong>Atención:</strong> {pago?.atencion?.id}</p>
        <p><strong>Forma de Pago:</strong> {pago?.forma_de_pago}</p>
        <p><strong>Importe:</strong> ${pago?.importe.toLocaleString()}</p>
        <p><strong>Cuotas:</strong> {pago?.cuotas}</p>
        <p><strong>Nro. Cuota:</strong> {pago?.nro_cuota}</p>
        <p><strong>Fecha:</strong> {new Date(pago?.fecha_hora_pago).toLocaleString()}</p>
        <button className={styles.closeBtn} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PagoDetalle;
